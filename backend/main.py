from pipeline.summarizer import transcript_summarizer
from pipeline.extractor import transcript_extractor
import gradio as gr

def response(message, history):
  user_files = message['files']

  if user_files:
    for file in user_files:
      file_path = file['path'] if isinstance(file, dict) else file
      summary = transcript_summarizer(file_path)
      extracted_items = transcript_extractor(file_path)
      result = f"Summary: \n{summary} \n \n {extracted_items}"
  
  return result


with gr.Blocks('Meeting Transcripter AI') as demo:
  gr.Markdown("Captur - An AI Meeting Transcripter 💖💪🏻")

  chatbot = gr.ChatInterface(
    fn=response,
    multimodal=True,
    chatbot=gr.Chatbot(height=420, show_label=False),
    textbox=gr.MultimodalTextbox(
      file_types=[".pdf", ".txt", ".wav", ".mp3", ".m4a", ".flac"],
      container=False,
      scale=8
    ),
  )


demo.launch()

