import os
from email.mime.image import MIMEImage

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
import mimetypes

mimetypes.add_type('image/svg+xml', '.svg')


def send_email(subject, to_email, template_name, context, attachments=None, from_email='hello.panelista@gmail.com'):
    """
    Send an email with the given parameters.

    :param subject: Subject of the email
    :param to_email: Recipient email address
    :param template_name: Path to the HTML template
    :param context: Context dictionary to render the template
    :param attachments: List of tuples (file_path, cid) for embedding images
    :param from_email: Sender's email address
    """
    # Render the HTML content from the template
    html_content = render_to_string(template_name, context)

    # Create the email
    msg = EmailMultiAlternatives(subject, '', from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")

    # Attach images if any
    if attachments:
        for file_path, cid in attachments:
            with open(file_path, 'rb') as f:
                maintype, subtype = mimetypes.guess_type(file_path)[0].split('/')
                mime_image = MIMEImage(f.read(), _subtype=subtype)
                mime_image.add_header('Content-ID', f'<{cid}>')
                mime_image.add_header('Content-Disposition', 'inline', filename=os.path.basename(file_path))
                msg.attach(mime_image)

    # Send the email
    msg.send()
