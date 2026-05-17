from langchain_groq import ChatGroq
from dotenv import load_dotenv
from config.settings import LLM_MODEL_NAME

load_dotenv()

llm = ChatGroq(
  model_name = LLM_MODEL_NAME
)