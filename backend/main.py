from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from supabase_client import supabase
from fastapi.middleware.cors import CORSMiddleware
from openai_client import generate_story

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Character(BaseModel):
    name: str
    details: str

@app.post("/api/create_character")
def create_character(character: Character):
    if not character.name.strip() or not character.details.strip():
        raise HTTPException(status_code=400, detail="Name and details cannot be empty.")
    
    try:
        result = supabase.table("characters").insert(character.dict()).execute()
        return {
            "message": f"Successfully added {character.name}",
            "character": result.data[0]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/characters")
def get_character_names():
    try:
        result = supabase.table("characters").select("name").execute()
        names = [char["name"] for char in result.data]
        return {"characters": names}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supabase error: {e}")

@app.post("/api/generate_story")
async def generate_story_endpoint(request: Request):
    body = await request.json()
    name = body.get("character_name")
    if not name:
        raise HTTPException(status_code=400, detail="character_name is required")
    try:
        result = supabase.table("characters").select("*").eq("name", name).execute()
        if not result.data:
            raise HTTPException(status_code=404, detail="Character not found")
        character = result.data[0]
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Supabase error: {e}")

    try:
        story = generate_story(character["name"], character["details"])
        return {"story": story}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI error: {e}")