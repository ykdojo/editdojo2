from rq import Queue
from worker import conn
from workerfunction import count_words_at_url

q = Queue(connection=conn)


result = q.enqueue(count_words_at_url, 'http://heroku.com')