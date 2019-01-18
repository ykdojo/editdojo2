from rq import Queue
from worker import conn
from workerfunction import twitter_checker
from rq_scheduler import Scheduler

q = Queue('Default', connection=conn)
scheduler = Scheduler(queue=q)
print('scheduler executed')

scheduler.cron(
    "*/5 * * * *",                # A cron string (e.g. "0 0 * * 0")
    func=twitter_checker,                  # Function to be queued
 #   args=[arg1, arg2],          # Arguments passed into function when executed
 #   kwargs={'foo': 'bar'},      # Keyword arguments passed into function when executed
 #   repeat=10,                  # Repeat this number of times (None means repeat forever)
    queue_name='Default'      # In which queue the job should be put in
 #   meta={'foo': 'bar'}         # Arbitrary pickleable data on the job itself
)

#result = q.enqueue(twitter_checker)

