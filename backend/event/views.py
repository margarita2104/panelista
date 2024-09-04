import os
from django.conf import settings
from django.db.models import Q
from django.utils import timezone
from rest_framework import status
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, GenericAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response

from event.models import Event
from event.serializers import EventSerializer

from organizer.models import Organizer
from speaker.models import Speaker

from user.utils import send_email

from user.permissions import IsOrganizerOrAdminOrReadOnly, IsOwnerOrAdminOrReadOnly


def send_application_email(event, speaker):
    context = {
        'organizer_name': event.organizer.user.first_name + ' ' + event.organizer.user.last_name,
        'speaker_name': speaker.user.first_name + ' ' + speaker.user.last_name,
        'speaker_email': speaker.user.email,
        'speaker_profile_link': f'https://panelista.propulsion-learn.ch/speakers/{speaker.id}/',
        'event_name': event.name,
        'current_year': timezone.now().year,
    }
    image_path = os.path.join(settings.BASE_DIR, 'templates/Logos/panelista-logo-black.jpg')

    attachments = [
        (image_path, 'logo')
    ]
    send_email(
        subject='Speaker Interest Notification',
        to_email=event.organizer.user.email,
        template_name='event_application_email.html',
        context=context,
        attachments=attachments
    )


class ListCreateEventsView(ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def get_queryset(self):
        location = self.request.query_params.get('location', None)
        type = self.request.query_params.get('type', None)
        about = self.request.query_params.get('about', None)

        q_objects = Q()
        if location:
            q_objects &= Q(city__icontains=location)
        if type:
            q_objects &= Q(type__icontains=type)
        if about:
            q_objects &= Q(description__icontains=about)

        queryset = Event.objects.filter(q_objects)
        return queryset

    def perform_create(self, serializer):
        user = self.request.user
        organizer = Organizer.objects.get(user=user)
        serializer.save(organizer=organizer)


class RetrieveUpdateDeleteEventsView(RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOrganizerOrAdminOrReadOnly]


class ApplyEventsView(GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'event_id'

    def get_object(self):
        event_id = self.kwargs.get('event_id')
        obj = get_object_or_404(self.queryset, id=event_id)
        return obj

    def post(self, request, *args, **kwargs):
        event = self.get_object()
        speaker = Speaker.objects.get(user=self.request.user)
        if speaker in event.applied_by.all():
            return Response({'message': 'You have already applied for this event.'}, status=status.HTTP_400_BAD_REQUEST)

        event.applied_by.add(speaker)
        event.save()
        send_application_email(event, speaker)

        return Response({'message': 'You have successfully applied for this event.'}, status=status.HTTP_200_OK)
