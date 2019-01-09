import tweepy
import os

auth = tweepy.OAuthHandler(os.environ['TWITTER_CONSUMER_KEY'], os.environ['TWITTER_CONSUMER_SECRET'])
auth.set_access_token(os.environ['TWITTER_ACCESS_KEY'], os.environ['TWITTER_ACCESS_SECRET'])
api = tweepy.API(auth)

def add_member(user_id=2939531959):
    api.add_list_member(id=user_id, slug='testlist', owner='editdojo')


