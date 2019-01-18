import requests
from users.models import already_in_twitter
from allauth.socialaccount.models import SocialAccount
import tweepy
import os

def count_words_at_url(url):
    resp = requests.get(url)
    return len(resp.text.split())


#Todo: background task that checks users in this db. for already_in_twitter.users that are False, \n
# add them to twitter list. then change them to True.

def twitter_checker():
    print("twitter checker started")
    #todo: find a way to keep tweepy authenticated without specifying it on every worker spinup
    #todo: find a way to retrieve user id in django models so i dont have to run api to get user id
    auth = tweepy.OAuthHandler(os.environ['TWITTER_CONSUMER_KEY'], os.environ['TWITTER_CONSUMER_SECRET'])
    auth.set_access_token(os.environ['TWITTER_ACCESS_KEY'], os.environ['TWITTER_ACCESS_SECRET'])
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
    #to save a record, use already_in_twitter(already_in_twitter=str(current_user), user=False).save()
    obj = already_in_twitter.objects.filter(already_in_twitter=False)
    for i in range(len(obj)):
        user_to_add = obj.values_list('user')[i][0]
        user_to_add_id = api.get_user(user_to_add)
        api.add_list_member(id=user_to_add_id, slug='testlist', owner='editdojo')
        update_db = already_in_twitter.objects.get(user=user_to_add)
        update_db.already_in_twitter = True
        update_db.save()







#def add_member(user_id=2939531959):
#    api.add_list_member(id=user_id, slug='testlist', owner='editdojo')




