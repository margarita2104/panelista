# Generated by Django 5.0.7 on 2024-07-29 11:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizer', '0002_initial'),
        ('review', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='event_organizer',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviews', to='organizer.organizer'),
        ),
    ]
