from rest_framework import serializers
from event.models import Event
from organizer.serializers import OrganizerSerializer
from organizer.models import Organizer


class EventSerializer(serializers.ModelSerializer):
    organizer = OrganizerSerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        organizer = Organizer.objects.get(user=user)
        validated_data['organizer'] = organizer
        return super().create(validated_data)

    def update(self, instance, validated_data):
        organizer_data = validated_data.pop('organizer', None)
        applied_by_data = validated_data.pop('applied_by', None)

        if organizer_data is not None:
            organizer_serializer = OrganizerSerializer(instance.organizer, data=organizer_data, partial=True)
            if organizer_serializer.is_valid(raise_exception=True):
                organizer_serializer.save()

        if applied_by_data is not None:
            instance.applied_by.set(applied_by_data)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
