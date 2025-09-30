import spacy
import numpy as np
from collections import Counter
from .coherence import TRANSITIONS, paragraph_split, count_transitions, pronoun_reference_ratio

# Load the spaCy model.
# Make sure to run: python -m spacy download en_core_web_sm
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("spaCy model 'en_core_web_sm' not found. Please run 'python -m spacy download en_core_web_sm'")
    nlp = None

def analyze_text_with_spacy(text: str):
    if not nlp:
        return {
            "sentence_lengths": [],
            "pos_counts": Counter(),
            "avg_sentence_len": 0,
            "sentence_len_std_dev": 0,
        }

    doc = nlp(text)
    
    # Sentence analysis
    sentences = list(doc.sents)
    sentence_lengths = [len(sent) for sent in sentences]
    avg_sentence_len = np.mean(sentence_lengths) if sentence_lengths else 0
    sentence_len_std_dev = np.std(sentence_lengths) if sentence_lengths else 0

    # POS analysis
    pos_counts = Counter(token.pos_ for token in doc if not token.is_punct)

    return {
        "sentences": sentences,
        "sentence_lengths": sentence_lengths,
        "pos_counts": pos_counts,
        "avg_sentence_len": avg_sentence_len,
        "sentence_len_std_dev": sentence_len_std_dev,
    }

def score_coherence_and_cohesion_advanced(text: str):
    # Basic analysis from the simple grader
    paragraphs = paragraph_split(text)
    n_par = len(paragraphs)
    transitions = count_transitions(text)
    pron_ratio = pronoun_reference_ratio(text)

    # Advanced analysis with spaCy
    try:
        spacy_analysis = analyze_text_with_spacy(text)
        avg_sentence_len = spacy_analysis["avg_sentence_len"]
        sentence_len_std_dev = spacy_analysis["sentence_len_std_dev"]
    except Exception as e:
        print(f"Error in spaCy analysis: {e}")
        # Fallback to basic analysis if spaCy fails
        from .coherence import score_coherence_and_cohesion
        basic_result = score_coherence_and_cohesion(text)
        return {
            "score": basic_result.get("score", 5.0),
            "n_paragraphs": n_par,
            "transitions_found": transitions,
            "pronoun_reference_ratio": round(pron_ratio, 3),
            "avg_sentence_len": 0,
            "sentence_len_std_dev": 0,
            "pos_counts": {},
            "warning": "Advanced analysis unavailable, using basic grading"
        }
    
    # Heuristic scoring
    score = 4.0 # Start with a base score
    
    # Paragraphing score
    if 3 <= n_par <= 5:
        score += 1.5
    elif n_par > 5:
        score += 0.5
        
    # Transition words score
    if transitions >= 3:
        score += 1.5
    elif transitions >= 1:
        score += 0.5
        
    # Pronoun reference score
    if 0.02 <= pron_ratio <= 0.07:
        score += 1.0
        
    # Sentence length variation score
    if 12 <= avg_sentence_len <= 25:
        score += 0.5
    if sentence_len_std_dev > 5: # Good variation
        score += 1.0

    # Lexical resource score (simple version)
    num_adjectives = spacy_analysis['pos_counts']['ADJ']
    num_adverbs = spacy_analysis['pos_counts']['ADV']
    if num_adjectives > 3 and num_adverbs > 1:
        score += 0.5

    # Clamp score between 0 and 9
    score = max(0.0, min(9.0, score))

    return {
        "score": round(score, 1),
        "n_paragraphs": n_par,
        "transitions_found": transitions,
        "pronoun_reference_ratio": round(pron_ratio, 3),
        "avg_sentence_len": round(avg_sentence_len, 1),
        "sentence_len_std_dev": round(sentence_len_std_dev, 2),
        "pos_counts": dict(spacy_analysis["pos_counts"]),
    }
