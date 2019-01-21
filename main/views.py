from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from users.views import finished_signup_flow

# render and return the main feed.
def render_feed(request):
    return render(request, 'main.html')

def home(request):
    current_user = request.user
    if not current_user.is_authenticated:
        return render(request, 'login.html')

    # TODO: Initiate the Twitter initialization in the background.
    # Maybe use this: https://django-background-tasks.readthedocs.io/en/latest/

    # Once the user is authenticated, show them the signup flow,
    # which includes language selection.
    if not finished_signup_flow(current_user):
        return HttpResponseRedirect('/signup/')

    return render_feed(request)
