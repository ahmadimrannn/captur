from pathlib import Path
from datetime import datetime
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.enums import TA_LEFT, TA_CENTER


def report_builder(summary, extracted_points):
    # ── Paths ──
    base_dir = Path(__file__).parent.parent
    reports_dir = base_dir / "output" / "reports"
    reports_dir.mkdir(parents=True, exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"captur_report_{timestamp}.pdf"
    filepath = reports_dir / filename

    # ── Document setup ──
    doc = SimpleDocTemplate(
        str(filepath),
        pagesize=letter,
        rightMargin=inch,
        leftMargin=inch,
        topMargin=inch,
        bottomMargin=inch
    )

    # ── Styles ──
    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "Title",
        parent=styles["Normal"],
        fontSize=24,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#1a1a1a"),
        alignment=TA_LEFT,
        leading=22,
        spaceAfter=12
    )

    subtitle_style = ParagraphStyle(
        "Subtitle",
        parent=styles["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=colors.HexColor("#888888"),
        alignment=TA_LEFT,
        spaceAfter=18
    )

    section_heading_style = ParagraphStyle(
        "SectionHeading",
        parent=styles["Normal"],
        fontSize=13,
        fontName="Helvetica-Bold",
        textColor=colors.HexColor("#1a1a1a"),
        spaceBefore=20,
        spaceAfter=8
    )

    body_style = ParagraphStyle(
        "Body",
        parent=styles["Normal"],
        fontSize=10,
        fontName="Helvetica",
        textColor=colors.HexColor("#333333"),
        leading=16,
        spaceAfter=6
    )

    # ── Content ──
    story = []

    # Title and date
    story.append(Paragraph("Captur - An AI Meeting Insights Extractor", title_style))
    story.append(Paragraph("Meeting Intelligence Report", subtitle_style))
    story.append(Paragraph(
        f"Generated on {datetime.now().strftime('%B %d, %Y at %I:%M %p')}",
        subtitle_style
    ))

    # Divider
    story.append(Spacer(1, 8))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#e0e0e0")))
    story.append(Spacer(1, 8))

    # Summary section
    story.append(Paragraph("Meeting Summary", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e0e0e0")))
    story.append(Spacer(1, 8))

    for line in summary.strip().split("\n"):
        if line.strip():
            story.append(Paragraph(line.strip(), body_style))

    story.append(Spacer(1, 16))

    # Extracted points section
    story.append(Paragraph("Key Insights", section_heading_style))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#e0e0e0")))
    story.append(Spacer(1, 8))

    for line in extracted_points.strip().split("\n"):
        if line.strip():
            # Category headings like "Action Items:" get bold style
            if line.strip().endswith(":") and not line.strip().startswith("-"):
                story.append(Spacer(1, 8))
                story.append(Paragraph(line.strip(), section_heading_style))
            else:
                story.append(Paragraph(line.strip(), body_style))

    # ── Build ──
    doc.build(story)

    return filename