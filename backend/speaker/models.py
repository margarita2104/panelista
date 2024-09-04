from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def get_profile_picture_upload_path(instance, filename):
    return f'{instance.id}/speakers/{filename}'


class Speaker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    topics = models.TextField(blank=True)
    current_job_title = models.CharField(max_length=255, blank=True)
    career_description = models.TextField(blank=True)
    picture = models.ImageField(upload_to=get_profile_picture_upload_path, blank=True)
    state = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255, blank=True)
    willingness_to_travel = models.CharField(max_length=10, blank=True,
                                             choices=[('0km', '0km'), ('50km', '50km'), ('100km', '100km'),
                                                      ('100+km', '100+km')])
    pronouns = models.CharField(max_length=50, blank=True,
                                choices=[('She/her', 'She/her'), ('He/him', 'He/him'), ('They/them', 'They/them'),
                                         ('Other', 'Other')])
    birth_year = models.IntegerField(blank=True, null=True)  # Removed validators to make optional
    professional_experience = models.CharField(max_length=50, blank=True, choices=[
        ('None', 'None'), ('1-3y', '1-3 years'), ('3-5y', '3-5 years'),
        ('5-10y', '5-10 years'), ('10-15y', '10-15 years'), ('15-20y', '15-20 years'),
        ('20-25y', '20-25 years'), ('25+ y', 'More than 25 years')])
    cultural_background = models.TextField(blank=True)
    speaker_experience = models.CharField(max_length=50, blank=True, choices=[
        ('None', 'None'), ('1-5', '1-5 engagements'), ('5-10', '5-10 engagements'),
        ('10-20', '10-20 engagements'), ('20+', 'More than 20 engagements'),
        ('Full-time', 'Full-time / professional speaker')])
    languages = models.TextField(blank=True)  # Changed from JSONField to TextField
    engagement_types = models.TextField(blank=True)  # Changed from JSONField to TextField
    max_event_size = models.CharField(max_length=50, blank=True, choices=[
        ('<25', 'Less than 25 attendees'), ('25-100', '25-100 attendees'), ('100-500', '100-500 attendees'),
        ('500-1000', '500-1000 attendees'), ('1000+', 'More than 1000 attendees')])
    general_availability = models.TextField(blank=True)
    contact_preferences = models.TextField(blank=True)  # Changed from JSONField to TextField
    linkedin_profile = models.URLField(blank=True)
    website = models.URLField(blank=True)
    additional_notes = models.TextField(blank=True)
    confirmation = models.BooleanField(default=False, blank=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
