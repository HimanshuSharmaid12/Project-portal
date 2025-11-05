# utils/similarity.py
import pandas as pd
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from utils.preprocess import normalize_text

DATA_PATH = os.path.join(os.path.dirname(__file__), "..", "data", "jobs.csv")

# simple cache
_JOBS_DF = None
_VECTORIZER = None
_JOB_TFIDF = None

def _load_jobs():
    global _JOBS_DF
    if _JOBS_DF is None:
        if not os.path.exists(DATA_PATH):
            # create empty df template
            _JOBS_DF = pd.DataFrame(columns=["_id","title","description","skills_required","location","salary"])
        else:
            _JOBS_DF = pd.read_csv(DATA_PATH, dtype=str).fillna("")
            # ensure skills_required is list-like (stored as comma-separated in CSV)
            if "skills_required" in _JOBS_DF.columns:
                _JOBS_DF["skills_required"] = _JOBS_DF["skills_required"].apply(lambda s: s if isinstance(s, str) else "")
                _JOBS_DF["skill_text"] = _JOBS_DF["skills_required"].apply(lambda x: " ".join([t.strip() for t in str(x).split(",") if t.strip()]))
            else:
                _JOBS_DF["skill_text"] = ""
            # prepare a combined text field
            _JOBS_DF["combined"] = (_JOBS_DF["title"].astype(str) + " " + _JOBS_DF["description"].astype(str) + " " + _JOBS_DF["skill_text"].astype(str)).map(normalize_text)
            # ensure an _id exists
            if "_id" not in _JOBS_DF.columns:
                _JOBS_DF["_id"] = _JOBS_DF.index.astype(str)
    return _JOBS_DF

def _ensure_vectorizer():
    global _VECTORIZER, _JOB_TFIDF
    if _VECTORIZER is None:
        df = _load_jobs()
        docs = df["combined"].tolist()
        _VECTORIZER = TfidfVectorizer(max_features=5000, ngram_range=(1,2))
        if len(docs) == 0:
            # fit on small dummy
            _JOB_TFIDF = _VECTORIZER.fit_transform([""])
        else:
            _JOB_TFIDF = _VECTORIZER.fit_transform(docs)
    return _VECTORIZER, _JOB_TFIDF

def recommend_jobs(query_text: str, top_n: int = 5):
    """
    Returns list of job dicts with highest cosine similarity to query_text.
    """
    df = _load_jobs()
    if df.empty:
        return []

    vectorizer, job_tfidf = _ensure_vectorizer()

    query_clean = normalize_text(query_text)
    q_vec = vectorizer.transform([query_clean])
    sims = cosine_similarity(q_vec, job_tfidf).flatten()
    df = df.copy()
    df["score"] = sims
    df = df.sort_values("score", ascending=False)
    top = df.head(top_n)

    # convert rows to dicts
    results = []
    for _, row in top.iterrows():
        results.append({
            "_id": str(row.get("_id")),
            "title": row.get("title", ""),
            "description": row.get("description", ""),
            "skills_required": [s.strip() for s in str(row.get("skills_required","")).split(",") if s.strip()],
            "location": row.get("location",""),
            "salary": row.get("salary",""),
            "score": float(row.get("score", 0.0))
        })
    return results
