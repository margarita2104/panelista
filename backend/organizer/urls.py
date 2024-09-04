from django.urls import path

from organizer.views import ListCreateOrganizersView, RetrieveUpdateDeleteOrganizersView, OrganizersMe, EditOrganizersMe

urlpatterns = [
    path('create/', ListCreateOrganizersView.as_view()),
    path('edit/<int:pk>/', RetrieveUpdateDeleteOrganizersView.as_view()),
    path('me/', OrganizersMe.as_view()),
    path('edit/me/', EditOrganizersMe.as_view()),
]
