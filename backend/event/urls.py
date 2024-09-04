from django.urls import path

from event.views import ListCreateEventsView, RetrieveUpdateDeleteEventsView, ApplyEventsView

urlpatterns = [
    path('', ListCreateEventsView.as_view()),
    path('<int:pk>/', RetrieveUpdateDeleteEventsView.as_view()),
    path('apply/<int:event_id>/', ApplyEventsView.as_view()),
]
