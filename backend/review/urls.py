from django.urls import path

from review.views import ListReview, CreateReview, RetrieveUpdateDeleteReview


urlpatterns = [
    path('', ListReview.as_view(), name='review'),
    path('create/', CreateReview.as_view(), name='create-review'),
    path('edit/<int:pk>/', RetrieveUpdateDeleteReview.as_view()),
    # path('events/<int:event_id>/speakers/<int:speaker_id>/reviews/', EventSpeakerReviewCreate.as_view(),
    #      name='create-review'),
    # path('speakers/<int:speaker_id>/reviews/', EventSpeakerReviewList.as_view(), name='speaker-reviews'),
]
