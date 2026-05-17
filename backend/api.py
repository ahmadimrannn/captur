from fastapi import FastAPI
import os
import shutil
from fastapi import (
  UploadFile, 
  File
)
from fastapi.middleware.cors import CORSMiddleware
from pipeline.summarizer import transcript_summarizer
from pipeline.extractor import transcript_extractor

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:5173"],
  allow_credentials=True,
  allow_headers=["*"],
  allow_methods=["*"]
)

@app.post('/process')
async def process_transcript(file: UploadFile = File(...)):
  temp_file_path = f"temp_{file.filename}"
  try:
    with open(temp_file_path, "wb") as buffer:
      shutil.copyfileobj(file.file, buffer)
    
    summary = transcript_summarizer(temp_file_path)
    extracted_points = transcript_extractor(temp_file_path)

    return {
      "summary": summary,
      "extracted_points": extracted_points
    }

  finally:
    if os.path.exists(temp_file_path):
      os.remove(temp_file_path)
