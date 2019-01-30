#Loads Apps
import django
django.setup()

from rq import Queue
from worker import conn
from twitter_checker import twitter_checker
import django_rq
import click

#This file schedules the jobs to be queued for the worker to process. If scheduled is set to True, it will schedule. Else, it will queue the job once.

@click.command()
@click.option('--flag', default=False, help='Boolean. Whether to schedule the jobs or not. If False, job will be queued once. If True, Job will be scheduled every minute.')
def jobscheduler(flag):
    click.echo('Task initiated...')
    if flag == True:
        click.echo(f"Flag set to: {flag}! setting up scheduler")
        scheduler = django_rq.get_scheduler('in_twitter_queue')
        print('scheduler has started')
        job = scheduler.cron(
                "* * * * *",                # A cron string (e.g. "0 0 * * 0")
                func=twitter_checker,                  # Function to be queued
                queue_name='in_twitter_queue'      # In which queue the job should be put in
            )
    else:
        click.echo(f"Flag set to: {flag}! - running one job only")
        q = Queue(connection=conn)
        result = q.enqueue(twitter_checker)

if __name__ == '__main__':
    jobscheduler()