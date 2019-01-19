from rq import Queue
from worker import conn
from testfunction import count



q = Queue(connection=conn)



result = q.enqueue(count)

