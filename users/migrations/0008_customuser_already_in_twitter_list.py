# Generated by Django 2.1.2 on 2019-01-30 19:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0007_auto_20190121_2043'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='already_in_twitter_list',
            field=models.BooleanField(default=False),
        ),
    ]
