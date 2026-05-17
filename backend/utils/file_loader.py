import os
from langchain_community.document_loaders import (
  AssemblyAIAudioTranscriptLoader,
  PyPDFLoader
)
from langchain_community.document_loaders.text import TextLoader

def load_file_by_extension(file_path):
  extension = os.path.splitext(file_path)[-1].lower()

  try:
    if extension == ".txt":
      return TextLoader(file_path).load()
    elif extension == ".mp3" or extension == ".m4a" or extension == ".wav" or extension == ".flac":
      return AssemblyAIAudioTranscriptLoader(file_path).load()
    elif extension == ".pdf":
      return PyPDFLoader(file_path).load()
    else:
      print("Unsupported document or file. Only pdf, audio files and txt files are allowed.")
      return []
  
  except Exception as e:
    print(f"Error loading {file_path}: {e}")
    return []