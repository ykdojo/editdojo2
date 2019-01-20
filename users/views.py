from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Language
from .models import already_in_twitter
from rq import Queue
from worker import conn

# returns True if the user has already finished the signup flow.
def finished_signup_flow(user):
    # The assumption of this function is that the user is already signed in.
    assert user.is_authenticated
    if len(user.learning_languages.all()) < 1:
        return False
    if len(user.fluent_languages.all()) < 1:
        return False
    return True

# Hanlde the signup flow
def signup_flow(request):
    current_user = request.user
    #already_in_twitter(already_in_twitter=str(current_user), user=False) #adds them to the already_in_twitter list

    #Todo: background task that checks users in this db. for already_in_twitter.users that are False, \n
    # add them to twitter list. then change them to True.
    
    if not current_user.is_authenticated:
        return HttpResponseRedirect('/')
    # TODO: If the user has already finished the signup flow,
    # then just redirect to root.
    if finished_signup_flow(current_user):
        return HttpResponseRedirect('/languagesSelected/') # TODO: change this to root
    return render(request, 'language_selection.html')

# Handle the POST request for selecting langauges
def select_languages(request):
    # First, make sure that the user is logged in.
    current_user = request.user
    if not current_user.is_authenticated:
        return HttpResponseRedirect('/signup/')

    learning_languages = []
    fluent_languages = []
    
    # Then, retrieve the lists of learning/fluent languages.
    i = 1; key = 'learning1'
    while key in request.POST and i < 100:
        learning_languages.append(request.POST[key])
        i += 1
        key = 'learning' + str(i)

    j = 1; key = 'fluent1'
    while key in request.POST and j < 100:
        fluent_languages.append(request.POST[key])
        j += 1
        key = 'fluent' + str(j)
    
    # Create the set of valid languages from each list.
    learning_language_set = set()
    for language in set(learning_languages):
        try:
            l = Language.objects.get(english_representation=language)
            learning_language_set.add(l)
        except Language.DoesNotExist:
            pass
    
    fluent_language_set = set()
    for language in set(fluent_languages):
        try:
            l = Language.objects.get(english_representation=language)
            fluent_language_set.add(l)
        except Language.DoesNotExist:
            pass
    
    # Make sure that there's at least one valid language in each category.
    if not fluent_language_set or not learning_language_set:
        return HttpResponseRedirect('/signup/')
    
    # Then, finally, add selected languages to the user's info.
    for language in learning_language_set:
        if not language in current_user.learning_languages.all():
            current_user.learning_languages.add(language)
    for language in fluent_language_set:
        if not language in current_user.fluent_languages.all():
            current_user.fluent_languages.add(language)
    current_user.save()
    return HttpResponseRedirect('/languagesSelected/')

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

