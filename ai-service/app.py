# app.py
from flask import Flask, jsonify
from routes.recommend import recommend_bp
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
app.register_blueprint(recommend_bp, url_prefix="/")

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "service": "ai-service", "env": os.getenv("FLASK_ENV", "production")})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", 5000)))
