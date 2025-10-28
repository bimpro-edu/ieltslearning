from fastapi import APIRouter, HTTPException
import json
from pathlib import Path
from typing import Dict, Any, List, Optional

router = APIRouter(prefix="/api/lessons")

def load_lessons(category: Optional[str] = None) -> Dict[str, Any]:
    if category:
        try:
            lessons_path = Path(__file__).parents[2] / "db" / "reading" / f"{category}.json"
            with open(lessons_path, "r") as f:
                return json.load(f)
        except FileNotFoundError:
            return {}
    else:
        lessons_path = Path(__file__).parents[2] / "db" / "lessons.json"
        with open(lessons_path, "r") as f:
            return json.load(f)

@router.get("/reading/{category}/{topic}")
async def get_reading_lesson(category: str, topic: str) -> Dict[str, Any]:
    lessons = load_lessons(category)
    if not lessons or category not in lessons or topic not in lessons[category]:
        raise HTTPException(status_code=404, detail="Reading lesson not found")
    return lessons[category][topic]

@router.get("/reading/{category}")
async def get_reading_category(category: str) -> Dict[str, Any]:
    lessons = load_lessons(category)
    if not lessons:
        raise HTTPException(status_code=404, detail="Reading category not found")
    return lessons

@router.get("/{lesson_id}")
async def get_lesson(lesson_id: str) -> Dict[str, Any]:
    lessons = load_lessons()
    for lesson in lessons:
        if lesson["id"] == lesson_id:
            return lesson
    raise HTTPException(status_code=404, detail="Lesson not found")

@router.get("/")
async def get_lessons() -> List[Dict[str, Any]]:
    return load_lessons()