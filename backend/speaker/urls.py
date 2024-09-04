from django.urls import path
from speaker.views import ListCreateSpeakersView, GetSpeakerMeView, EditSpeakerMeView, RetrieveUpdateDeleteSpeakersView, \
    SpeakerReviewsView, speakerFeedView

urlpatterns = [
    path('create/', ListCreateSpeakersView.as_view()),
    path('edit/me/', EditSpeakerMeView.as_view()),
    path('edit/<int:pk>/', RetrieveUpdateDeleteSpeakersView.as_view()),
    path('me/', GetSpeakerMeView.as_view()),
    path('feed/', speakerFeedView, name='speakerFeed'),
    path('<int:speaker_id>/reviews/', SpeakerReviewsView.as_view(), name='speaker-reviews')
]
