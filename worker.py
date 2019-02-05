import os
import redis
from rq import Worker, Queue, Connection

#this is the file that spins up a worker to process redis queues.

listen = ['in_twitter_queue', 'local']

redis_url = os.getenv('REDISTOGO_URL', 'redis://localhost:6379') #heroku only

conn = redis.from_url(redis_url)

if __name__ == '__main__':
    with Connection(conn): #sets up connection
        worker = Worker(map(Queue, listen))
        worker.work() #worker is spun up to listen to queue