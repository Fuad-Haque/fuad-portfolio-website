import resend
from app.config import get_settings

settings = get_settings()

async def send_contact_email(name: str, email: str, project_type: str, budget: str, message: str):
    if not settings.resend_api_key:
        print(f"[EMAIL SKIPPED] From: {name} <{email}>")
        return

    resend.api_key = settings.resend_api_key

    resend.Emails.send({
        "from": settings.resend_from_email,
        "to": settings.resend_to_email,
        "subject": f"New inquiry from {name} — {project_type}",
        "html": f"""
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> {name}</p>
        <p><b>Email:</b> {email}</p>
        <p><b>Project Type:</b> {project_type}</p>
        <p><b>Budget:</b> {budget}</p>
        <p><b>Message:</b></p>
        <p>{message}</p>
        """
    })