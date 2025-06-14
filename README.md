# 🧙‍♂️ Character Story Generator

A full-stack application that allows users to create fictional characters and generate short stories about them using OpenAI's language model.

## 🧰 Tech Stack

- **Frontend**: React
- **Backend**: FastAPI (Python)
- **Database**: Supabase
- **AI Integration**: OpenAI GPT (Chat API)


## 🚀 Features

- Add characters with name and description.
- View all added characters in a dropdown.
- Generate a 4–5 sentence story about a selected character using OpenAI.
- Clean and simple UI.


## 🏗️ Folder Structure
```bash
project-root/
│
├── backend/
│ ├── main.py
│ ├── supabase_client.py
│ ├── openai_client.py
│ ├── requirements.txt
│ └── .env
│
├── frontend/
│   └── Lsquaredfront/
│       ├── App.js
│       ├── App.css
│       ├── index.js
│       └── package.json
│
├── .gitignore
├── README.md
```

## ⚙️ Setup Instructions

1. Clone the Repository

git clone https://github.com/Fahiz-ztk/openaistorygenerator.git
cd openaistorygenerator

2. Set Up the Backend

Create .env file inside backend/:

SUPABASE_URL=supabase-url
SUPABASE_KEY=supabase-anon-key
OPENAI_API_KEY=openai-api-key

Install dependencies and run:

cd backend
pip install -r requirements.txt
uvicorn main:app --reload

3. Set Up the Frontend

cd frontend/Lsquaredfront
npm install
npm run dev
The React app will run on http://localhost:5173

🧪 Test the APIs with Curl

# Create Character

curl -X POST http://localhost:8000/api/create_character -H "Content-Type: application/json" -d "{\"name\": \"Bilbo Baggins\", \"details\": \"Hobbit who lives in the Shire owning a magic ring\"}"


# Generate Story

curl -X POST http://localhost:8000/api/generate_story -H "Content-Type: application/json" -d "{\"character_name\": \"Bilbo Baggins\"}"
