from rq import Queue
from worker import conn
from workerfunction import twitter_checker

q = Queue(connection=conn)


result = q.enqueue(twitter_checker)