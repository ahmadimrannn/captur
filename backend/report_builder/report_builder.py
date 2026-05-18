from pathlib import Path
from reportlab.pdfgen import canvas

def report_builder(summary, extracted_points):
  # Define path relative to this file
  base_dir = Path(__file__).parent.parent
  filename = base_dir / "output" / "reports" / "meeting_transcript.pdf"

  pdf = canvas.Canvas(str(filename))
  pdf.save()


if __name__ == "__main__":
  report_builder('hello', 'hello')