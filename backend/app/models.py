
from pydantic import BaseModel
from typing import List, Dict, Any, Literal
from sqlalchemy import Boolean, Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base

# Database ORM Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_teacher = Column(Boolean, default=False)

class Submission(Base):
    __tablename__ = "submissions"
    id = Column(Integer, primary_key=True, index=True)
    exercise_id = Column(String, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text)
    report = Column(Text) # Store report as JSON string
    is_reviewed = Column(Boolean, default=False)
    teacher_comment = Column(Text, nullable=True)

    owner = relationship("User")


# Pydantic Models (for API)
class LessonContent(BaseModel):
    type: str
    text: str
    band: str | None = None

class Lesson(BaseModel):
    id: str
    title: str
    content: List[LessonContent]
    exercises: List[str]

class SkeletonItem(BaseModel):
    role: str
    prompt: str

class SkeletonFillExercise(BaseModel):
    id: str
    type: Literal["skeleton_fill"]
    title: str
    skeleton: List[SkeletonItem]
    answer_constraints: Dict[str, Any]

class ReorderExercise(BaseModel):
    id: str
    type: Literal["reorder"]
    title: str
    scrambled_sentences: List[str]
    correct_order: List[int]

class ConnectorChoiceExercise(BaseModel):
    id: str
    type: Literal["connector_choice"]
    title: str
    text: str
    choices: List[str]
    correct_answer: str

class ParagraphImprovementExercise(BaseModel):
    id: str
    type: Literal["paragraph_improvement"]
    title: str
    original_paragraph: str



class SubmitReorderPayload(BaseModel):
    user_id: str
    answers: List[int] # submitted order of indices

class SubmitSkeletonPayload(BaseModel):
    user_id: str
    answers: List[str]

class SubmitConnectorChoicePayload(BaseModel):
    user_id: str
    answer: str

class SubmitParagraphImprovementPayload(BaseModel):
    user_id: str
    rewritten_paragraph: str

class UserCreate(BaseModel):
    email: str
    password: str
    is_teacher: bool = False

class UserInDB(BaseModel):
    id: int
    email: str
    is_teacher: bool

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
