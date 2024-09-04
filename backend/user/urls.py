from django.urls import path

from user.views import RegistrationView, RegistrationValidationView, GetUserMeView

urlpatterns = [
    path('registration/', RegistrationView.as_view()),
    path('registration/validation/', RegistrationValidationView.as_view()),
    path('user/me/', GetUserMeView.as_view()),
]
