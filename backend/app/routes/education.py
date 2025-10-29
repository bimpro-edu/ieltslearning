from fastapi import APIRouter, HTTPException
import json
import os

router = APIRouter()

@router.get("/education-examples")
async def get_education_examples():
    try:
        file_path = os.path.join("db", "reading", "education-examples.json")
        with open(file_path, "r") as f:
            data = json.load(f)
        return data["education"]["examples"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))