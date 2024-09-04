from django.contrib import admin

from organizer.models import Organizer


class OrganizerAdmin(admin.ModelAdmin):
    list_display = ('id',)


admin.site.register(Organizer, OrganizerAdmin)
