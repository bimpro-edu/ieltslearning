from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from ..listening_data import get_listening_category, get_listening_topic

router = APIRouter(prefix="/api/listening")

@router.get("/{category}")
async def get_category(category: str) -> Dict[str, Any]:
    data = get_listening_category(category)
    if data["title"] == "Category not found":
        raise HTTPException(status_code=404, detail="Category not found")
    return data

@router.get("/{category}/{topic}")
async def get_topic(category: str, topic: str) -> Dict[str, Any]:
    data = get_listening_topic(category, topic)
    if data["title"] == "Topic not found":
        raise HTTPException(status_code=404, detail="Topic not found")
    return data