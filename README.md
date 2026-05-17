# Captur
 
> Transform meeting transcripts and audio files into structured summaries, action items, decisions, and deadlines — powered by LangChain and FastAPI.
 
---
 
## What it does
 
Captur takes raw meeting transcripts or audio files and runs them through an AI pipeline that produces two things:
 
- A concise narrative summary of the entire meeting
- Structured extraction of action items, decisions, task owners, and deadlines
Drop in a file. Get back everything that matters.
 
---
 
## Tech Stack
 
**Backend**
- Python 3.11
- FastAPI — REST API layer
- LangChain — map-reduce chain pipeline
- Groq (LLM) — summarization and extraction
- AssemblyAI — audio transcription
- PyPDF — PDF loading
**Frontend**
- React JS
- TanStack Query — API data fetching
---
 
## Project Structure
 
```
debriefed/
├── backend/
│   ├── api.py                        # FastAPI entry point
│   ├── pipeline/
│   │   ├── summarizer.py             # map-reduce summarization chain
│   │   └── extractor.py              # map-reduce extraction chain
│   ├── utils/
│   │   ├── document_processor.py     # file loading and chunk splitting
│   │   ├── text_cleaner.py           # transcript cleaning
│   │   └── file_loader.py            # multi-format file loader
│   ├── config/
│   │   ├── settings.py               # environment variables and constants
│   │   └── llm.py                    # LLM instance
│   ├── input-transcripts/            # sample transcripts for testing
│   ├── requirements.txt
│   └── .env
│
└── frontend/
    ├── src/
    ├── public/
    └── package.json
```
 
---
 
## How it works
 
```
User uploads file (txt / pdf / audio)
         │
         ▼
   FastAPI receives file
         │
         ├──→ transcript_summarizer()  ──→ concise meeting summary
         │
         └──→ transcript_extractor()   ──→ action items, decisions,
                                           task owners, deadlines
         │
         ▼
   JSON response returned to frontend
```
 
Both the summarizer and extractor use LangChain's **map-reduce** chain — the transcript is split into chunks, each chunk is processed independently by the LLM, and the results are combined into a final output. This allows Captur to handle meetings of any length without hitting context limits.
 
---
 
## Getting Started
 
### Prerequisites
 
- Python 3.11+
- Node.js 18+
- Groq API key
- AssemblyAI API key (only needed for audio files)
### Backend setup
 
```bash
# clone the repo
git clone https://github.com/yourusername/captur.git
cd captur/backend
 
# create and activate virtual environment
python -m venv venv
source venv/bin/activate        # on Windows: venv\Scripts\activate
 
# install dependencies
pip install -r requirements.txt
 
# create .env file
cp .env.example .env
# add your API keys to .env
 
# run the server
uvicorn api:app --reload
```
 
The API will be running at `http://localhost:8000`
 
Visit `http://localhost:8000/docs` for the interactive API documentation.
 
### Frontend setup
 
```bash
cd captur/frontend
 
# install dependencies
npm install
 
# start the dev server
npm run dev
```
 
The frontend will be running at `http://localhost:3000`
 
---
 
## Environment Variables
 
Create a `.env` file inside the `backend/` folder:
 
```env
GROQ_API_KEY=your_groq_api_key
ASSEMBLYAI_API_KEY=your_assemblyai_api_key
LLM_MODEL_NAME=llama3-8b-8192
CHUNK_SIZE=3000
CHUNK_OVERLAP=200
```
 
---
 
## API Reference
 
### `POST /process`
 
Upload a meeting transcript or audio file for processing.
 
**Request**
- Content-Type: `multipart/form-data`
- Body: `file` — supported formats: `.txt`, `.pdf`, `.mp3`, `.m4a`, `.wav`, `.flac`
**Response**
```json
{
  "summary": "The team discussed Q3 launch timeline...",
  "extracted_points": "Action Items:\n- ...\n\nDecisions:\n- ..."
}
```
 
---
 
## Supported File Formats
 
| Format | Type |
|--------|------|
| `.txt` | Plain text transcript |
| `.pdf` | PDF transcript |
| `.mp3` | Audio recording |
| `.m4a` | Audio recording |
| `.wav` | Audio recording |
| `.flac` | Audio recording |
 
---
 
## Roadmap
 
- [ ] Report builder — export results as PDF or markdown
- [ ] Authentication — multi-user support
- [ ] Meeting history — save and retrieve past meetings
- [ ] Slack and Notion integration
- [ ] Real-time streaming responses
---
 
## License
 
MIT License — see `LICENSE` for details.
 
