# IELTS Writing Application - Technical Memory Entry

## Project Overview
This is an educational platform designed to help IELTS students improve their writing skills, specifically focusing on "Coherence and Cohesion" for Task 2 essays. The application has evolved from a writing-focused tool to include listening and reading modules.

## Architecture & Tech Stack

### Backend (Python/FastAPI)
- **Framework**: FastAPI with uvicorn server
- **Database**: SQLite (`test.db`) with SQLAlchemy ORM
- **Authentication**: JWT tokens with bcrypt password hashing
- **NLP Processing**: spaCy for advanced text analysis (`en_core_web_sm` model)
- **Structure**: Modular design with separate files for auth, database, models, and graders

### Frontend (React/Vite)
- **Framework**: React 18 with Vite build tool
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS with custom configuration
- **State Management**: React Context API for authentication
- **UI Libraries**: Lucide React for icons, ReactFlow for mindmaps

## Key Components & Data Flow

### Authentication System
**Strengths:**
- JWT-based authentication with configurable expiration
- Bcrypt password hashing
- React Context for client-side auth state
- Protected routes implementation

**Potential Issues:**
- Hardcoded secret key (`"your-secret-key"`) - major security vulnerability
- Missing token refresh mechanism
- Auth user lookup inconsistency (`current_user['username']` vs proper user object)
- No proper teacher role validation in protected endpoints

### Database Models
**Core Tables:**
- `users`: id, email, hashed_password, is_teacher
- `submissions`: id, exercise_id, user_id, content, report (JSON), is_reviewed, teacher_comment

**Data Storage:**
- Lessons and exercises stored as JSON files (`db/lessons.json`, `db/exercises.json`)
- User submissions stored in SQLite database
- Mixed approach creates potential consistency issues

### Grading System
**Two-tier implementation:**
1. **Basic Grader** (`coherence.py`): Simple heuristics for transitions, pronouns, sentence length
2. **Advanced Grader** (`advanced_coherence.py`): Enhanced with spaCy NLP analysis

**Grading Criteria:**
- Paragraph count and structure
- Transition word usage
- Pronoun reference patterns
- Sentence length variation
- Part-of-speech analysis
- Lexical resource assessment

**Scoring Issues:**
- Function name inconsistency: `score_coherence_and_cohesion_advanced` called but not imported
- Missing error handling for spaCy model not found
- Hard-coded scoring thresholds may need calibration

### Exercise Types
1. **Skeleton Fill**: Guided essay structure building
2. **Reorder**: Sentence sequencing for logical flow
3. **Connector Choice**: Multiple choice transition words
4. **Paragraph Improvement**: Text rewriting exercises

## Recent Development (Based on Git History)
The project has expanded significantly beyond writing:

1. **Listening Module**: Comprehensive implementation with categories, topics, mindmaps
2. **Reading Module**: Recently added (part 1 implementation)
3. **Modular UI**: Category-based pages with sidebar navigation and canvas views
4. **Rich Content**: Tips, traps, and predictions for different IELTS sections

## Areas of Concern & Potential Bugs

### Critical Security Issues
1. **Hardcoded JWT Secret**: Major vulnerability in production
2. **Missing Input Validation**: API endpoints lack proper validation
3. **Teacher Role Bypass**: Comments mention missing teacher verification

### Authentication & Authorization Bugs
1. **User Lookup Inconsistency**: `current_user['username']` suggests auth function returns dict, but model expects UserInDB object
2. **Missing Error Handling**: No proper handling for invalid tokens or expired sessions
3. **Cross-origin Issues**: No CORS configuration visible

### Data Consistency Issues
1. **Mixed Storage**: JSON files vs database creates sync problems
2. **Missing Relationships**: No foreign key constraints in JSON data
3. **Hardcoded Exercise IDs**: Endpoints tied to specific exercise IDs

### Grading System Issues
1. **Import Error**: `score_coherence_and_cohesion_advanced` function name mismatch
2. **spaCy Dependency**: Application may fail if model not installed
3. **Error Handling**: Missing exception handling for NLP processing failures

### Frontend Issues
1. **API Error Handling**: Limited error handling in fetch calls
2. **Loading States**: Basic loading indicators may cause poor UX
3. **Token Management**: No automatic token refresh or expiry handling

## Current Module Implementation Status
- **Writing Module**: Core functionality complete, grading system functional
- **Listening Module**: Extensive implementation with rich UI components
- **Reading Module**: Recently started (part 1), basic structure in place
- **Teacher Dashboard**: Basic functionality, needs role-based access control

## Recommendations for Bug Fixing Priority
1. **HIGH**: Fix JWT secret key and authentication flow
2. **HIGH**: Resolve grading function import error
3. **MEDIUM**: Implement proper teacher role validation
4. **MEDIUM**: Add comprehensive error handling
5. **LOW**: Migrate from mixed JSON/DB storage to unified database approach

This memory entry provides a foundation for understanding the codebase structure and identifying areas that need attention during bug fixing and future development.