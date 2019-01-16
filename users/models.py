from django.contrib.auth.models import AbstractUser, UserManager
from allauth.socialaccount import app_settings
from django.db import models

class CustomUserManager(UserManager):
    pass

class Language(models.Model):
    # Representation of this language in English.
    # For example, "Japanese" or "Spanish".
    english_representation = models.CharField(max_length=100)
    
    # TODO: Add a LanguageLabel model later representing
    # languages in different languages.
    # For example, in the future, we want to be able to represent
    # English in Japanese (英語), Japanese in French (japonais), and so on.

    def __str__(self):
        return self.english_representation

    class Meta:
        ordering = ('english_representation',)

class CustomUser(AbstractUser):
    objects = CustomUserManager()
    learning_languages = models.ManyToManyField(Language, related_name="learning_users")
    fluent_languages = models.ManyToManyField(Language, related_name="fluent_users")

# A post made by a user.
class Post(models.Model):
    text_content = models.TextField()

    # The only choice for the source field is "twitter" right now.
    source = models.CharField(max_length=100)

    # If this post was originally created on Twitter, we should
    # store the Twitter user ID in twitter_user_id.
    # This is for a case like this:
    # User A on Edit Dojo uses @account1 on Twitter to create a post.
    # Then, User A associates their acocunt with another Twitter
    # account, @account2 (maybe for a different language).
    # When that happens, it'll be still good to know which Twitter
    # account this post came from originally.
    twitter_user_id = models.CharField(max_length=app_settings.UID_MAX_LENGTH)
    # NOTE: I used app_settings.UID_MAX_LENGTH here to follow the
    # original pattern in django-allauth:
    # https://github.com/pennersr/django-allauth/blob/master/allauth/socialaccount/app_settings.py

    # Dumb assumption here: the tweet ID is never longer than 100 chars.
    tweet_id_str = models.CharField(max_length=100)

    posted_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date_posted = models.DateField()