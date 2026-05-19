from fastapi import (
  FastAPI,
  UploadFile, 
  File,
  HTTPException
)
import os
import shutil
from fastapi.middleware.cors import CORSMiddleware
from pipeline.summarizer import transcript_summarizer
from pipeline.extractor import transcript_extractor
from utils.report_builder import report_builder
from pathlib import Path
from fastapi.responses import FileResponse

app = FastAPI()

app.add_middleware(
  CORSMiddleware,
  allow_origins=["http://localhost:8080"],
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

    pdf_filename = report_builder(summary, extracted_points)

    return {
      "summary": summary,
      "extracted_points": extracted_points,
      "pdf_filename": pdf_filename
    }

  finally:
    if os.path.exists(temp_file_path):
      os.remove(temp_file_path)


@app.get("/download/{filename}")
async def download_pdf(filename: str):
  filepath = Path('output/reports') / filename

  if not filepath.exists():
    raise HTTPException(status_code=404, detail="Report not found")
  
  return FileResponse(
    filename=filename,
    media_type="application/pdf",
    path=str(filepath)
  )

