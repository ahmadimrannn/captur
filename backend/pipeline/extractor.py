from utils.document_processor import load_and_split
from langchain_core.prompts import ChatPromptTemplate
from langchain_classic.chains.summarize import load_summarize_chain
from config.llm import llm

def transcript_extractor(file):
  final_text_docs = load_and_split(file)

  map_prompt = """
    You are an expert meeting analyst. Your job is to extract key information
    from this chunk of a larger meeting transcript.

    Extract the following in exactly this format, nothing else:

    Action Items:
    - [action item]

    Decisions:
    - [decision]

    Task Owners:
    - [person name]: [what they are responsible for]

    Deadlines:
    - [task]: [deadline date or timeframe]

    Must follow these rules:
    - Extract between 3 to 7 points per category maximum
    - If more than 7 exist, prioritize the most critical ones
    - If a category has no items, write "None mentioned"
    - Only extract what is explicitly stated in this chunk
    - Do not invent or assume any information
    - Keep each point concise, one line maximum

    Transcript chunk: {text}
  """

  map_prompt_template = ChatPromptTemplate.from_template(map_prompt)

  reduce_prompt = """
    You are an expert meeting analyst. Extract the following information
    from the meeting transcript accurately and concisely.

    Return the output in exactly this format, nothing else:

    Action Items:
    - [action item]

    Decisions:
    - [decision]

    Task Owners:
    - [person name]: [what they are responsible for]

    Deadlines:
    - [task]: [deadline date or timeframe]

    Must follow these rules:
    - Extract between 3 to 7 points per category maximum
    - If more than 7 exist, prioritize the most critical ones
    - If a category has no items, write "None mentioned"
    - Only extract what is explicitly stated in the transcript
    - Do not invent or assume any information
    - Keep each point concise, one line maximum

    Transcript: {text}
  """

  reduce_prompt_template = ChatPromptTemplate.from_template(reduce_prompt)

  extractor_chain = load_summarize_chain(
    llm=llm,
    chain_type="map_reduce",
    map_prompt=map_prompt_template,
    combine_prompt=reduce_prompt_template,
    verbose=False
  )

  result = extractor_chain.invoke(final_text_docs)
  extracted = result['output_text']

  return extracted # Return extracted items from the meeting given by the LLM


if __name__ == "__main__":
  print(transcript_extractor('input-transcripts/transcript.txt'))