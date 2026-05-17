from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from utils.text_cleaner import clean_transcript
from utils.file_loader import load_file_by_extension
from config.settings import (
  CHUNK_SIZE,
  CHUNK_OVERLAP,
)

def load_and_split(file):
  raw_loaded_text = load_file_by_extension(file)
  text = clean_transcript(raw_loaded_text[0].page_content)
  docs = [Document(metadata=raw_loaded_text[0].metadata, page_content=text)]

  text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
  final_text_docs = text_splitter.split_documents(docs)

  return final_text_docs