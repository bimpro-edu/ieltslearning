import json
from typing import Dict, Any
from pathlib import Path

# Load listening lessons data
def load_listening_data() -> Dict[str, Any]:
    try:
        base_path = Path(__file__).parent.parent / "db" / "listening"
        return {
            "core-skills": json.load(open(base_path / "core-skills.json")),
            "question-types": json.load(open(base_path / "question-types.json")),
            "test-skills": json.load(open(base_path / "test-skills.json"))
        }
    except FileNotFoundError as e:
        print(f"Warning: Listening lesson file not found: {e}")
        return {}
    except json.JSONDecodeError as e:
        print(f"Error parsing listening lesson file: {e}")
        return {}

# Load the listening data
LISTENING = load_listening_data()

# Get a specific category of listening data
def get_listening_category(category: str) -> Dict[str, Any]:
    return LISTENING.get(category, {"title": "Category not found", "topics": []})

# Get a specific topic within a category
def get_listening_topic(category: str, topic: str) -> Dict[str, Any]:
    category_data = get_listening_category(category)
    topic_data = next((t for t in category_data.get("topics", []) if t["key"] == topic), None)
    return topic_data or {"title": "Topic not found", "templates": [], "mindmap": None, "tips": [], "traps": []}