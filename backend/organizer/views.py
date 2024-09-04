from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListCreateAPIView, ListAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from organizer.serializers import OrganizerSerializer

from organizer.models import Organizer

from user.permissions import IsOwnerOrAdminOrReadOnly


class OrganizerView(RetrieveUpdateDestroyAPIView):
    serializer_class = OrganizerSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]

    def get_object(self):
        return self.request.user

    def delete(self, request, *args, **kwargs):
        user = self.get_object()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ListCreateOrganizersView(ListCreateAPIView):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer
    permission_classes = [IsAuthenticated]


class RetrieveUpdateDeleteOrganizersView(RetrieveUpdateDestroyAPIView):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer
    permission_classes = [IsOwnerOrAdminOrReadOnly]


class OrganizersMe(ListAPIView):
    serializer_class = OrganizerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Organizer.objects.filter(user=user)


class EditOrganizersMe(UpdateAPIView):
    serializer_class = OrganizerSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        user = self.request.user
        organizer = Organizer.objects.get(user=user)
        return organizer
