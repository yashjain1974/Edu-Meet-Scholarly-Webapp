# Generated by Django 4.0 on 2023-02-25 18:30

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('pub_id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=120)),
                ('category', models.CharField(max_length=30)),
                ('file', models.FileField(max_length=254, upload_to=None)),
                ('date', models.DateField(default=datetime.datetime(2023, 2, 25, 18, 30, 54, 137187, tzinfo=utc))),
                ('private', models.BooleanField(default=False)),
            ],
        ),
    ]
