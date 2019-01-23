from django.shortcuts import render
from django.http import HttpResponseRedirect
from .models import Language

# returns True if the user has already finished the signup flow.
def finished_signup_flow(user):
    # The assumption of this function is that the user is already signed in.
    assert user.is_authenticated
    if len(user.learning_languages.all()) < 1:
        return False
    if len(user.fluent_languages.all()) < 1:
        return False
    return True

# Hanlde the signup flow after the user is authenticated.
def signup_flow(request):
    current_user = request.user
    # The sign-up flow happens after the user is authenticated.
    # If they are not authenticated, redirect them to root.
    if not current_user.is_authenticated:
        return HttpResponseRedirect('/')
    # If the user has already finished the signup flow, there's
    # no need to do it again. So, redirect them to root.
    if finished_signup_flow(current_user):
        return HttpResponseRedirect('/')
    return render(request, 'language_selection.html')

# Handle the POST request for selecting langauges
def select_languages(request):
    # First, make sure that the user is logged in.
    current_user = request.user
    if not current_user.is_authenticated:
        return HttpResponseRedirect('/')

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
    return HttpResponseRedirect('/')