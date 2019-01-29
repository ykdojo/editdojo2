from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import PermissionDenied
from users.views import finished_signup_flow
from main.models import Post, PostSerializer
from rest_framework.renderers import JSONRenderer

def get_serialized_feed(request):
    current_user = request.user
    if not current_user.is_authenticated:
        raise PermissionDenied

    # TODO: Change posts to the acutal posts we want to pull
    posts = Post.objects.all()[:2]
    serializer = PostSerializer(posts, many=True)
    serialized = JSONRenderer().render(serializer.data)
    return HttpResponse(serialized)

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
    return render(request, 'main.html')
