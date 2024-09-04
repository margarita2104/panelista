# Generated by Django 5.0.7 on 2024-07-22 11:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('event', '0001_initial'),
        ('organizer', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='organizer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organizer.organizer'),
        ),
    ]
