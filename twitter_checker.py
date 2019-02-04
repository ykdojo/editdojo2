from users.models import CustomUser
from allauth.socialaccount.models import SocialAccount
import tweepy
import os
from main.models import Post

#This is the function that gets queued to the worker to run.
#This function adds users into the twitter list if they are not in the twitter list yet.
def twitter_checker():
    print("twitter checker started")
    auth = tweepy.OAuthHandler(os.environ['TWITTER_CONSUMER_KEY'], os.environ['TWITTER_CONSUMER_SECRET'])
    auth.set_access_token(os.environ['TWITTER_ACCESS_KEY'], os.environ['TWITTER_ACCESS_SECRET'])
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
    users = CustomUser.objects.filter(already_in_twitter_list=False) #looks for all users who are 'False' in the model.
    sa = SocialAccount.objects.all()
    for user in users:
        userid = [acc.uid for acc in sa if user.username == str(acc)] #returns the UID of user in socialaccount if it matches with customuser
        if len(userid[0]) == 0: #if uid returns empty. userid is a list, so we grab the element inside it
            userid = api.get_user(user) #use the api instead to get UID
        api.add_list_member(user_id=userid[0], slug=os.environ['TWITTER_LIST'], owner_screen_name=os.environ['OWNER_SCREEN_NAME']) #add user to twitter list
        user.already_in_twitter_list = True #Database is updated to show that the user has been added to the twitter list.
        user.save()

    #################################### RETRIEVE-ALL TWEETS FROM LIST ############################################
def tweet_retriever():
    tweets_in_list = api.list_timeline(owner_screen_name='EditDojo', slug='twittermemberlist', include_rts=False, tweet_mode='Extended')
    filtered = filter(lambda t: not t.text.startswith('@'), tweets_in_list)
    tweets_without_mentions = list(filtered)
    for tweet in tweets_without_mentions:
        twitter_account = SocialAccount.objects.get(
            user_id=tweet.user.id_str)  # find the socialaccount related to the person to tweeted
        if twitter_account and Post.objects.filter(
                tweet_id_str=tweet.id_str) < 0:  # if twitter account returns a record and tweet does not exist already
            new_post = Post(
                text_content=tweet.text,
                source='twitter',  # TODO: move this constant into a separate file
                associated_social_account=twitter_account,
                tweet_id_str=tweet.id_str,
                posted_by=CustomUser.objects.get(username = tweet.user.screen_name),
                date_posted=tweet.created_at
            )
            new_post.save()
    return("Job executed successfully")



