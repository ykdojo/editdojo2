# Generated by Django 2.1.2 on 2019-01-21 20:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20190121_2016'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='associated_social_account',
        ),
        migrations.RemoveField(
            model_name='post',
            name='posted_by',
        ),
        migrations.DeleteModel(
            name='Post',
        ),
    ]
