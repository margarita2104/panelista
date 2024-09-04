import os

from django.conf import settings
from django.utils import timezone

from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework import serializers

from organizer.models import Organizer
from speaker.models import Speaker
from user.utils import send_email
import mimetypes

mimetypes.add_type('image/svg+xml', '.svg')

User = get_user_model()


def send_welcome_email(new_user):
    context = {
        'user': new_user,
        'code': new_user.code,
        'current_year': timezone.now().year,
    }

    image_path = os.path.join(settings.BASE_DIR, 'templates/Logos/panelista-logo-black.jpg')

    attachments = [
        (image_path, 'logo')
    ]
    send_email(
        subject='Thank you for registering!',
        to_email=new_user.email,
        template_name='registration_email.html',
        context=context,
        attachments=attachments
    )


class FirstUserRegistrationSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'role']

    def create(self, validated_data):
        email = validated_data.get('email')
        role = validated_data.get('role')
        if role == 'speaker':
            new_user = User(
                email=email,
                is_active=False,
                is_speaker=True,
            )
            new_user.save()

        else:
            new_user = User(
                email=email,
                is_active=False,
                is_organizer=True,
            )
            new_user.save()

        send_welcome_email(new_user)
        return new_user


class UserRegistrationSerializer(serializers.ModelSerializer):
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'password', 'password_repeat', 'first_name', 'last_name', 'code']

    def validate(self, instance):
        password = instance.get('password')
        password_repeat = instance.get('password_repeat')

        if password != password_repeat:
            raise serializers.ValidationError({'repeat_password': 'Passwords must match.'})

        return instance

    def update(self, instance, validated_data):
        validated_data.pop('password_repeat')  # Remove password-repeat since it's not needed for user update
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
            instance.save()
            return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password', 'code', 'groups', 'user_permissions', 'username', 'is_staff', 'is_superuser']


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        if instance.is_speaker:
            Speaker.objects.create(user=instance)
        elif instance.is_organizer:
            Organizer.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if instance.is_speaker:
        instance.speaker.save()
    elif instance.is_organizer:
        instance.organizer.save()
