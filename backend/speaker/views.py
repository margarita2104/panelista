from django.db.models import Q
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from review.models import Review
from review.serializers import ReviewSerializer
from django.shortcuts import render
from speaker.serializers import SpeakerSerializer
from speaker.models import Speaker
from user.permissions import IsOwnerOrAdminOrReadOnly


class SpeakerView(RetrieveUpdateDestroyAPIView):
    serializer_class = SpeakerSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListCreateSpeakersView(ListCreateAPIView):
    serializer_class = SpeakerSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def get_queryset(self):
        location = self.request.query_params.get('location', None)
        current_job_title = self.request.query_params.get('current_job_title', None)
        about = self.request.query_params.get('about', None)

        q_objects = Q()
        if location:
            q_objects &= Q(city__icontains=location)
        if current_job_title:
            q_objects &= Q(current_job_title__icontains=current_job_title)
        if about:
            q_objects &= Q(career_description__icontains=about)

        queryset = Speaker.objects.filter(q_objects)
        return queryset


class RetrieveUpdateDeleteSpeakersView(RetrieveUpdateDestroyAPIView):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]


class GetSpeakerMeView(ListAPIView):
    serializer_class = SpeakerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Speaker.objects.filter(user=user)


class EditSpeakerMeView(RetrieveUpdateDestroyAPIView):
    serializer_class = SpeakerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Return the user object associated with the request
        user = self.request.user
        speaker = Speaker.objects.get(user=user)
        return speaker


class SpeakerReviewsView(ListCreateAPIView):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        speaker_id = self.kwargs['speaker_id']
        return Review.objects.filter(speaker_id=speaker_id)

    def perform_create(self, serializer):
        speaker_id = self.kwargs['speaker_id']
        serializer.save(speaker_id=speaker_id)


def speakerFeedView(request):
    speakers = Speaker.objects.all()
    return render(request, 'speaker_feed.html', {'speakers': speakers})
