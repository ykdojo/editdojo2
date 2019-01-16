# This file is just for showing an example of how to use tweepy.
# You can run this file with: python manage.py shell < tweepy_sample.py
import tweepy
import os
from users.models import CustomUser
from allauth.socialaccount.models import SocialAccount

CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
ACCESS_KEY = os.environ['TWITTER_ACCESS_KEY']
ACCESS_SECRET = os.environ['TWITTER_ACCESS_SECRET']

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

sample_user = CustomUser.objects.all()[0]
twitter_account = SocialAccount.objects.get(user_id=sample_user.id)
# TODO: We should probably omit mentions here.
tweets = api.user_timeline(twitter_account.uid, tweet_mode='extended')
for tweet in tweets[:5]:
    print(tweet.full_text)