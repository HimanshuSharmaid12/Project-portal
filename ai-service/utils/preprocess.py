# utils/preprocess.py
import re
import nltk
from nltk.corpus import stopwords

# ensure NLTK stopwords are available
try:
    _ = stopwords.words("english")
except Exception:
    nltk.download("stopwords")
    _ = stopwords.words("english")

STOP = set(stopwords.words("english"))

def normalize_text(text: str) -> str:
    """
    Basic text cleaning:
    - lowercasing
    - remove non-alphanumeric
    - remove stopwords
    - collapse whitespace
    """
    if not text:
        return ""
    text = text.lower()
    # replace non alpha-numeric with spaces
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    words = [w for w in text.split() if w and w not in STOP and len(w) > 1]
    return " ".join(words)
