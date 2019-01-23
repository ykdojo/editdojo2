from rq import Queue
from worker import conn
from twitter_checker import twitter_checker
import django_rq
import click
#Loads Apps
import django
django.setup()


@click.command()
@click.option('--scheduled', default=False, help='Whether to schedule the jobs or not. If False, job will be queued once. If True, Job will be scheduled every minute.')
def jobscheduler(scheduled):
    if scheduled == True:
        scheduler = django_rq.get_scheduler('in_twitter_queue')
        print('scheduler has started')
        job = scheduler.cron(
                "* * * * *",                # A cron string (e.g. "0 0 * * 0")
                func=twitter_checker,                  # Function to be queued
                queue_name='in_twitter_queue'      # In which queue the job should be put in
            )
    else:
        q = Queue(connection=conn)
        result = q.enqueue(twitter_checker)

