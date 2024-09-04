from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

from user.serializers import FirstUserRegistrationSerializer, UserRegistrationSerializer, UserSerializer

User = get_user_model()


class RegistrationView(CreateAPIView):
    serializer_class = FirstUserRegistrationSerializer
    permission_classes = (AllowAny,)


class RegistrationValidationView(GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):

        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return Response({'message': 'Email and code are required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = User.objects.get(email=email)
        except Exception:
            return Response({'message': 'User is not found.'}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_active is True:
            return Response({'message': 'You are already registered'}, status=status.HTTP_400_BAD_REQUEST)
        if user.code != code:
            return Response({'message': 'Invalid code.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user.is_active = True
        user.save()

        return Response({'message': 'your Registration is complete'}, status=status.HTTP_200_OK)


class GetUserMeView(ListAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)
