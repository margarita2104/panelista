from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def get_profile_picture_upload_path(instance, filename):
    return f'{instance.id}/organizers/{filename}'


class Organizer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    company = models.CharField(max_length=100, blank=True, null=True)
    picture = models.ImageField(upload_to=get_profile_picture_upload_path, blank=True)
    experience = models.CharField(max_length=50, blank=True, choices=[
        ('None', 'None'), ('1-3y', '1-3 years'), ('3-5y', '3-5 years'),
        ('5-10y', '5-10 years'), ('10-15y', '10-15 years'), ('15-20y', '15-20 years'),
        ('20-25y', '20-25 years'), ('25+ y', 'More than 25 years')])
    email = models.EmailField(max_length=254, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"
