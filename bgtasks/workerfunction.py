from django_rq import job

@job
def count():
    return 1 + 1