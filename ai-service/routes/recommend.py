# routes/recommend.py
from flask import Blueprint, request, jsonify
from utils.preprocess import normalize_text
from utils.similarity import recommend_jobs
import logging

recommend_bp = Blueprint("recommend", __name__)

@recommend_bp.route("/recommend", methods=["POST"])
def recommend():
    """
    POST /recommend
    Body: { "userId": "...", "skills": ["skill1", "skill2"] }  OR { "text": "full text describing candidate" }
    Response: { recommendations: [ {job}, ... ] }
    """
    payload = request.get_json() or {}
    skills = payload.get("skills")
    text = payload.get("text")
    user_id = payload.get("userId")

    if skills:
        if isinstance(skills, list):
            query = " ".join(skills)
        else:
            query = skills
    elif text:
        query = text
    else:
        return jsonify({"error": "Please provide 'skills' or 'text' in request body."}), 400

    query = normalize_text(query)
    try:
        recs = recommend_jobs(query, top_n=5)
        return jsonify({"recommendations": recs})
    except Exception as e:
        logging.exception("Recommendation error")
        return jsonify({"error": "Recommendation failed", "details": str(e)}), 500
