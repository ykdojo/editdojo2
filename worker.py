import os
from r_queue import queueing
import redis
from rq import Worker, Queue, Connection

listen = ['Default']

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379')

conn = redis.from_url(redis_url)

from rq import Queue
from workerfunction import twitter_checker
from rq_scheduler import Scheduler

def queueing():
    q = Queue('Default', connection=conn)
    scheduler = Scheduler(queue=q)
    print('scheduler executed')

    scheduler.cron(
        "*/5 * * * *",                # A cron string (e.g. "0 0 * * 0")
        func=twitter_checker,                  # Function to be queued
     #   args=[arg1, arg2],          # Arguments passed into function when executed
     #   kwargs={'foo': 'bar'},      # Keyword arguments passed into function when executed
        queue_name='Default'      # In which queue the job should be put in
     #   meta={'foo': 'bar'}         # Arbitrary pickleable data on the job itself
    )

if __name__ == '__main__':
    with Connection(conn):
        worker = Worker(map(Queue, listen))
        worker.work()
        queueing(conn)