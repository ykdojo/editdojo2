# This is a one-time script for creating post samples
# using real tweets.
# You can run this file with: python manage.py shell < create_post_samples.py
import tweepy
import os
from users.models import CustomUser, Post
from allauth.socialaccount.models import SocialAccount

CONSUMER_KEY = os.environ['TWITTER_CONSUMER_KEY']
CONSUMER_SECRET = os.environ['TWITTER_CONSUMER_SECRET']
ACCESS_KEY = os.environ['TWITTER_ACCESS_KEY']
ACCESS_SECRET = os.environ['TWITTER_ACCESS_SECRET']

auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)
auth.set_access_token(ACCESS_KEY, ACCESS_SECRET)
api = tweepy.API(auth)

sample_user = CustomUser.objects.get(username = 'csdojo404')
twitter_account = SocialAccount.objects.get(user_id=sample_user.id)
tweets = api.user_timeline(twitter_account.uid, tweet_mode='extended', include_rts=False)
filtered = filter(lambda t: not t.full_text.startswith('@'), tweets)
tweets_without_mentions = list(filtered)

for tweet in tweets_without_mentions:
    new_post = Post(
        text_content = tweet.full_text,
        source = 'twitter', # TODO: move this constant into a separate file
        twitter_user_id = tweet.user.id_str,
        tweet_id_str = tweet.id_str,
        posted_by = sample_user,
        date_posted = tweet.created_at
    )
    new_post.save()