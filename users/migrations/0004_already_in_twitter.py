# Generated by Django 2.1.2 on 2019-01-07 02:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20181211_2211'),
    ]

    operations = [
        migrations.CreateModel(
            name='already_in_twitter',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('already_in_twitter', models.CharField(default=False, max_length=10)),
            ],
        ),
    ]
