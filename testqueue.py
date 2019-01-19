from rq import Queue
from worker import conn




q = Queue(connection=conn)


def count():
    return 1 + 1

result = q.enqueue(count)

