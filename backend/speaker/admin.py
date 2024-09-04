from django.contrib import admin

from speaker.models import Speaker


class SpeakerAdmin(admin.ModelAdmin):
    list_display = ('id',)


admin.site.register(Speaker, SpeakerAdmin)
