from users.models import CustomUser
from allauth.socialaccount.models import SocialAccount
import tweepy
import os


#This is the function that gets queued to the worker to run.
#This function adds users into the twitter list if they are not in the twitter list yet.
def twitter_checker():
    print("twitter checker started")
    #todo: find a way to keep tweepy authenticated without specifying it on every worker spinup
    #todo: find a way to retrieve user id in django models so i dont have to run api to get user id
    auth = tweepy.OAuthHandler(os.environ['TWITTER_CONSUMER_KEY'], os.environ['TWITTER_CONSUMER_SECRET'])
    auth.set_access_token(os.environ['TWITTER_ACCESS_KEY'], os.environ['TWITTER_ACCESS_SECRET'])
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
    users = CustomUser.objects.filter(already_in_twitter_list=False) #looks for all users who are 'False' in the model.
    for user in users:
        user_to_add = users.values_list('username')[i][0] #get user ID
        user_to_add_id = api.get_user(user_to_add)
        #todo: need to make an actual twitterlist first
        api.add_list_member(user_id=user_to_add_id['id'], slug='editdojo_member_list', owner_screen_name='editdojo') #add user to twitter list
        user = CustomUser.objects.get(username=user_to_add)
        user.already_in_twitter = True #Database is updated to show that the user has been added to the twitter list.
        user.save()
    return("Job executed successfully")


#---Manipulating Database---

#Adding Records
#to save a record, use already_in_twitter(already_in_twitter=False, user='editdojo').save()



