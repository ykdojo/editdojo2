# Generated by Django 2.1.2 on 2019-01-26 22:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='already_in_twitter',
        ),
        migrations.AddField(
            model_name='customuser',
            name='already_in_twitter_list',
            field=models.BooleanField(default=False),
        ),
    ]
