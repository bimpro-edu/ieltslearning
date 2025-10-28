"""
Initialize the FastAPI routes package.
"""
from fastapi import APIRouter

# Import all route modules
from .listening import router as listening_router
from .lessons import router as lessons_router

# Create root router to combine all other routers
api_router = APIRouter()

# Include all route modules
api_router.include_router(listening_router)
api_router.include_router(lessons_router)