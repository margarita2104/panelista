from django.db import models
from organizer.models import Organizer
from speaker.models import Speaker


def get_image_upload_path(instance, filename):
    return f'{instance.id}/event_pictures/{filename}'


class Event(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    zip = models.CharField(max_length=100, blank=True, null=True)
    street = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(max_length=500, blank=True, null=True)
    topics = models.CharField(max_length=100, blank=True, null=True)
    industry = models.CharField(max_length=100, blank=True, null=True)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    website = models.URLField(max_length=200, blank=True, null=True)
    type = models.CharField(max_length=20,
                            choices=(('Conference', 'Conference'), ('Seminar', 'Seminar'),
                                     ('Corporate event', 'Corporate event'), ('Panel discussion', 'Panel discussion'),
                                     ('Other', 'Other')),
                            default='none')
    image = models.ImageField(upload_to=get_image_upload_path, null=True, blank=True)
    organizer = models.ForeignKey(to=Organizer, on_delete=models.CASCADE)
    applied_by = models.ManyToManyField(to=Speaker, blank=True, null=True)
