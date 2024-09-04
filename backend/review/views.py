from rest_framework import filters
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from organizer.models import Organizer
from review.models import Review
from review.serializers import ReviewSerializer
from user.permissions import IsOrganizerOrAdminOrReadOnly


class ListReview(ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    search_fields = ['content']
    filter_backends = (filters.SearchFilter,)

    def get_queryset(self):
        speaker_id = self.kwargs.get('speaker_id')
        if speaker_id:
            return Review.objects.filter(speaker_id=speaker_id)
        return super().get_queryset()


class CreateReview(CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        try:
            organizer = Organizer.objects.get(user=user)
            serializer.save(event_organizer=organizer)
        except Organizer.DoesNotExist:
            raise PermissionDenied("You must be an organizer to have permission to create,submit review.")


class RetrieveUpdateDeleteReview(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsOrganizerOrAdminOrReadOnly]
