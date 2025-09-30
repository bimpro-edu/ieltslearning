# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an IELTS learning application focused on improving writing skills, particularly "Coherence and Cohesion" for Task 2 essays. It features interactive lessons, exercises, automated feedback, and progress tracking for students and teachers.

## Development Commands

### Frontend (React + Vite)
- **Development server**: `cd frontend && npm run dev`
- **Build**: `cd frontend && npm run build`
- **Lint**: `cd frontend && npm run lint`
- **Preview production build**: `cd frontend && npm run preview`

### Backend (FastAPI + Python)
- **Install dependencies**: `cd backend && pip install -r requirements.txt`
- **Development server**: `cd backend && uvicorn app.main:app --reload`
- **Production server**: `cd backend && uvicorn app.main:app`

## Architecture

### Backend Structure
- **FastAPI application** with SQLAlchemy ORM and SQLite database
- **Authentication system** using JWT tokens with OAuth2PasswordRequestForm
- **Automated grading system** for coherence and cohesion analysis (in `app/graders/`)
- **Data storage**: JSON files (`db/lessons.json`, `db/exercises.json`) + SQLite for user data
- **Key endpoints**:
  - Auth: `/api/auth/signup`, `/api/auth/login`
  - Content: `/api/lessons`, `/api/exercises/{id}`
  - Submissions: `/api/exercises/{id}/submit`
  - Teacher dashboard: `/api/submissions`

### Frontend Structure
- **React SPA** with React Router for navigation
- **Authentication context** (`context/AuthContext.jsx`) managing user state
- **Module-based pages**: Writing, Listening, Reading with interactive mindmaps
- **Interactive components**: Mindmap viewers, exercise interfaces, progress tracking
- **Key routes**:
  - `/tasks/writing` - Main writing module
  - `/tasks/listening` - Listening module with category pages
  - `/tasks/reading` - Reading module
  - `/exercises/{id}` - Individual exercise pages
  - `/teacher/dashboard` - Teacher review interface

### Data Flow
1. **Lessons and exercises** loaded from JSON files on backend startup
2. **User submissions** stored in SQLite with automated grading reports
3. **Frontend** communicates via REST API with JWT authentication
4. **Teacher dashboard** allows review and commenting on student submissions

### Key Technical Details
- **Grading system**: Heuristic-based analysis in `coherence.py` and `advanced_coherence.py`
- **Exercise types**: Skeleton fill, paragraph improvement, connector choice, reordering
- **Authentication**: Protected routes with JWT tokens, teacher/student role separation
- **Database models**: User, Submission tables with foreign key relationships
- **Mindmap components**: ReactFlow-based interactive learning modules

## Important Files
- `backend/app/main.py` - Main FastAPI application and routes
- `backend/app/models.py` - Database ORM and Pydantic models
- `backend/app/graders/` - Automated grading algorithms
- `frontend/src/App.jsx` - Main React application with routing
- `frontend/src/context/AuthContext.jsx` - Authentication state management
- `db/lessons.json` - Lesson content and structure
- `db/exercises.json` - Exercise definitions and data