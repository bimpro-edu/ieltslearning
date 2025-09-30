import json
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from sqlalchemy.orm import Session
from datetime import timedelta
from fastapi.security import OAuth2PasswordRequestForm

from . import models, auth, database
from .graders.coherence import score_coherence_and_cohesion
from .graders.advanced_coherence import score_coherence_and_cohesion_advanced
from .models import Lesson, SubmitReorderPayload, SubmitSkeletonPayload, SubmitConnectorChoicePayload, SubmitParagraphImprovementPayload, UserCreate, UserInDB, Token
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # React dev server URLs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Load data from JSON files on startup with error handling
try:
    lessons_db = json.load(open("db/lessons.json", "r"))
except FileNotFoundError:
    print("Warning: db/lessons.json not found. Creating empty lessons database.")
    lessons_db = []
except json.JSONDecodeError as e:
    print(f"Error parsing db/lessons.json: {e}")
    lessons_db = []

try:
    exercises_db = json.load(open("db/exercises.json", "r"))
except FileNotFoundError:
    print("Warning: db/exercises.json not found. Creating empty exercises database.")
    exercises_db = []
except json.JSONDecodeError as e:
    print(f"Error parsing db/exercises.json: {e}")
    exercises_db = []

# --- Health Check Endpoint ---

@app.get("/api/health")
def health_check():
    from .graders.advanced_coherence import nlp
    return {
        "status": "healthy",
        "lessons_count": len(lessons_db),
        "exercises_count": len(exercises_db),
        "spacy_available": nlp is not None
    }

# --- Auth Endpoints ---

@app.post("/api/auth/signup", response_model=UserInDB)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(email=user.email, hashed_password=hashed_password, is_teacher=user.is_teacher)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.post("/api/auth/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=auth.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = auth.create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# --- Content Endpoints ---

@app.get("/api/lessons", response_model=List[Lesson])
def get_lessons():
    return lessons_db

@app.get("/api/lessons/{lesson_id}", response_model=Lesson)
def get_lesson(lesson_id: str):
    for lesson in lessons_db:
        if lesson["id"] == lesson_id:
            return lesson
    raise HTTPException(status_code=404, detail="Lesson not found")

@app.get("/api/exercises/{exercise_id}")
def get_exercise(exercise_id: str):
    for exercise in exercises_db:
        if exercise["id"] == exercise_id:
            return exercise
    raise HTTPException(status_code=404, detail="Exercise not found")

# --- Submission & Grading Endpoints ---

@app.post("/api/exercises/ex-skeleton-01/submit")
def submit_skeleton_exercise(payload: SubmitSkeletonPayload, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    full_text = "\n\n".join(payload.answers)
    report = score_coherence_and_cohesion_advanced(full_text)

    submission = models.Submission(
        exercise_id="ex-skeleton-01",
        user_id=current_user.id,
        content=full_text,
        report=json.dumps(report)
    )
    db.add(submission)
    db.commit()

    return {"ok": True, "report": report}

@app.post("/api/exercises/ex-para-improve-01/submit")
def submit_paragraph_improvement_exercise(payload: SubmitParagraphImprovementPayload, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    exercise = next((ex for ex in exercises_db if ex["id"] == "ex-para-improve-01"), None)
    if not exercise:
        raise HTTPException(status_code=404, detail="Exercise not found")

    original_report = score_coherence_and_cohesion_advanced(exercise["original_paragraph"])
    rewritten_report = score_coherence_and_cohesion_advanced(payload.rewritten_paragraph)

    submission = models.Submission(
        exercise_id="ex-para-improve-01",
        user_id=current_user.id,
        content=payload.rewritten_paragraph,
        report=json.dumps(rewritten_report)
    )
    db.add(submission)
    db.commit()

    return {
        "ok": True,
        "original_report": original_report,
        "rewritten_report": rewritten_report
    }

# ... (other submission endpoints to be updated similarly)

# --- Teacher Dashboard Endpoints ---

@app.get("/api/submissions")
def get_submissions(unreviewed: bool = False, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Check if current_user is a teacher
    if not current_user.is_teacher:
        raise HTTPException(status_code=403, detail="Access forbidden: Teacher role required")
    
    query = db.query(models.Submission)
    if unreviewed:
        query = query.filter(models.Submission.is_reviewed == False)
    return query.all()

@app.post("/api/submissions/{submission_id}/comment")
def add_teacher_comment(submission_id: int, comment: str, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    # Check if current_user is a teacher
    if not current_user.is_teacher:
        raise HTTPException(status_code=403, detail="Access forbidden: Teacher role required")
    
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    submission.teacher_comment = comment
    submission.is_reviewed = True
    db.commit()
    return {"ok": True, "submission": submission}
