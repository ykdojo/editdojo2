import os
from django.core.management.base import BaseCommand
from rq import Queue
import django_rq
from redis import Redis
import datetime


from users.models import CustomUser
from allauth.socialaccount.models import SocialAccount
import tweepy
import os
from main.models import Post


def twitter_checker():
    print("twitter checker started")
    auth = tweepy.OAuthHandler(os.environ['TWITTER_CONSUMER_KEY'], os.environ['TWITTER_CONSUMER_SECRET'])
    auth.set_access_token(os.environ['TWITTER_ACCESS_KEY'], os.environ['TWITTER_ACCESS_SECRET'])
    api = tweepy.API(auth, parser=tweepy.parsers.JSONParser())
    users = CustomUser.objects.filter(
        already_in_twitter_list=False)  # looks for all users who are 'False' in the model.
    sa = SocialAccount.objects.all()
    for user in users:
        userid = [acc.uid for acc in sa if user.username == str(
            acc)]  # returns the UID of user in socialaccount if it matches with customuser
        if len(userid[0]) == 0:  # if uid returns empty. userid is a list, so we grab the element inside it
            userid = api.get_user(user)  # use the api instead to get UID
        api.add_list_member(user_id=userid[0], slug=os.environ['TWITTER_LIST'],
                            owner_screen_name=os.environ['OWNER_SCREEN_NAME'])  # add user to twitter list
        user.already_in_twitter_list = True  # Database is updated to show that the user has been added to the twitter list.
        user.save()
    #################################### RETRIEVE-ALL TWEETS FROM LIST ############################################
    tweets_in_list = api.list_timeline(owner_screen_name=os.environ['OWNER_SCREEN_NAME'],
                                       slug=os.environ['TWITTER_LIST'], include_rts=False,
                                       tweet_mode='Extended')
    filtered = filter(lambda t: not t['text'].startswith('@'), tweets_in_list)
    tweets_without_mentions = list(filtered)
    for tweet in tweets_without_mentions:
        twitter_account = SocialAccount.objects.get(
            uid=tweet['user']['id_str'])  # find the socialaccount related to the person to tweeted
        if twitter_account and len(Post.objects.filter(tweet_id_str=tweet[
            'id_str'])) > 0:  # if twitter account returns a record and tweet does not exist already
            if (tweet['id_str'],) not in list(Post.objects.values_list('tweet_id_str')):
                new_post = Post(
                    text_content=tweet['text'],
                    source='twitter',  # TODO: move this constant into a separate file
                    associated_social_account=twitter_account,
                    tweet_id_str=tweet['id_str'],
                    posted_by=CustomUser.objects.get(username=tweet['user']['screen_name']),
                    date_posted=datetime.datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')
                )
                new_post.save()
    return ('Job completed successfully')

class Command(BaseCommand):
    help = 'Displays current time'

    def add_arguments(self, parser):
        parser.add_argument('--local', dest='local', required=True,  help='whether to run locally or not')
        parser.add_argument('--schedule', dest='schedule',  required=True, help='whether to schedule or not. Default False')

    def handle(self, *args, **kwargs):
        local = kwargs['local']
        schedule = kwargs['schedule']
        if local == 'False':
            print('this process is running on the server')
            if schedule == 'True':
                scheduler = django_rq.get_scheduler('in_twitter_queue')
                print('scheduler has started')
                job = scheduler.cron(
                    "* * * * *",  # A cron string (e.g. "0 0 * * 0")
                    func=twitter_checker,  # Function to be queued
                    queue_name='in_twitter_queue'  # In which queue the job should be put in
                )

            else:
                print('running one off job')
                queue = django_rq.get_queue('in_twitter_queue')

                queue.enqueue(twitter_checker)
        else:
            print("This process is running locally")
            queue = django_rq.get_queue('default')
            queue.enqueue(twitter_checker)
            #q = Queue(connection=Redis())
            #qenqueue(self.twitter_checker())

