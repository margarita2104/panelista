from django.db import models
from organizer.models import Organizer
from speaker.models import Speaker


class Review(models.Model):
    Rating = [
        (1, 1),
        (2, 2),
        (3, 3),
        (4, 4),
        (5, 5),
    ]
    content = models.CharField(max_length=500)
    rating = models.IntegerField(choices=Rating)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE, related_name='reviews')
    event_organizer = models.ForeignKey(Organizer, on_delete=models.SET_NULL, related_name='reviews', null=True,
                                        blank=True)
