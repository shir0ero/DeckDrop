from fastapi import FastAPI

app = FastAPI(title="DeckDrop ML Service", version="0.1.0")

@app.get("/health")
def health() -> dict:
    return {"success": True, "service": "deckdrop-ml", "status": "ok"}

@app.post("/analyze-sentiment")
def analyze_sentiment(payload: dict) -> dict:
    text = payload.get("text", "")
    # Placeholder logic; replace with model inference in next phase.
    score = 0.5 if text else 0.0
    return {"success": True, "score": score}
