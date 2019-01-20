import django
django.setup()


from rq import Queue
from worker import conn
from main.views import twitter_checker



q = Queue(connection=conn)



result = q.enqueue(twitter_checker)

