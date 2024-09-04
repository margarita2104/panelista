from rest_framework import serializers

from review.models import Review


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'content', 'rating', 'speaker', 'event_organizer']

    def create(self, validated_data):
        return Review.objects.create(**validated_data)


# def create(self, validated_data):
#     event_organizer = self.context['request'].user
#     return Review.objects.create(event_organizer=event_organizer, **validated_data)
