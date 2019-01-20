from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from users.views import finished_signup_flow
from users.models import already_in_twitter

def home(request):
    current_user = request.user
    if not current_user.is_authenticated:
        return render(request, 'login.html')

    # TODO: Initiate the Twitter initialization in the background.
    # Maybe use this: https://django-background-tasks.readthedocs.io/en/latest/

    # Then, show them the signup flow, including language selection.
    if not finished_signup_flow(current_user):
        return HttpResponseRedirect('/signup/')

    return render(request, 'main.html')

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