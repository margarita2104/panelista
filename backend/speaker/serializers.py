from rest_framework import serializers

from review.models import Review
from speaker.models import Speaker
from user.serializers import UserSerializer


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'content', 'rating', 'event_organizer']


class SpeakerSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Speaker
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user_serializer = UserSerializer(data=user_data)
        if user_serializer.is_valid(raise_exception=True):
            user = user_serializer.save()
            speaker = Speaker.objects.create(user=user, **validated_data)
            return speaker

    # def update(self, instance, validated_data):
    #     user_data = validated_data.pop('user', None)
    #     if user_data is not None:
    #         user_serializer = UserSerializer(instance.user, data=user_data, partial=True)
    #         if user_serializer.is_valid(raise_exception=True):
    #             user_serializer.save()
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
    #     return instance
