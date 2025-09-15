# file: graders/coherence.py
import re
from collections import Counter
from typing import Dict, List
TRANSITIONS = set([
    "however","moreover","furthermore","in addition","therefore","thus","consequently",
    "on the other hand","nevertheless","for example","for instance","firstly","secondly","finally",
    "in conclusion","to sum up","as a result","although","despite"
])

def count_transitions(text: str) -> int:
    text_l = text.lower()
    count = 0
    for t in TRANSITIONS:
        count += text_l.count(t)
    return count

def paragraph_split(text: str) -> List[str]:
    # naive split on double newlines
    parts = [p.strip() for p in re.split(r'\n{2,}', text) if p.strip()]
    return parts

def has_topic_sentence(paragraph: str) -> bool:
    # heuristic: first sentence contains a "claim" word (is, can, will, reduces, increases)
    first_sentence = re.split(r'(?<=[.!?])\s+', paragraph.strip())[0]
    return bool(re.search(r'\b(is|are|can|does|will|may|reduces|increases|suggests|shows|provides)\b', first_sentence.lower()))

def pronoun_reference_ratio(text: str) -> float:
    pronouns = re.findall(r'\b(this|that|these|those|it|they|their|them)\b', text.lower())
    words = re.findall(r'\w+', text)
    if not words:
        return 0.0
    return len(pronouns)/len(words)

def score_coherence_and_cohesion(text: str) -> Dict:
    paragraphs = paragraph_split(text)
    n_par = len(paragraphs)
    topic_sentences = sum(1 for p in paragraphs if has_topic_sentence(p))
    transitions = count_transitions(text)
    pron_ratio = pronoun_reference_ratio(text)
    avg_sentence_len = sum(len(s.split()) for s in re.split(r'(?<=[.!?])\s+', text) if s.strip()) / max(1, len(re.split(r'(?<=[.!?])\s+', text)))

    # rough heuristics to map to 0-9
    score = 5.0
    if n_par >= 3: score += 1.0
    if topic_sentences >= max(1, n_par): score += 1.0
    if transitions >= 3: score += 1.0
    if 0.02 <= pron_ratio <= 0.06: score += 1.0
    if 12 <= avg_sentence_len <= 25: score += 0.5
    # clamp 0-9
    score = max(0.0, min(9.0, score))
    return {
        "score": round(score,1),
        "n_paragraphs": n_par,
        "topic_sentences": topic_sentences,
        "transitions_found": transitions,
        "pronoun_reference_ratio": round(pron_ratio,3),
        "avg_sentence_len": round(avg_sentence_len,1)
    }
