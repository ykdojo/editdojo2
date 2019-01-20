web: gunicorn editdojo_project.wsgi —-log-file -
web: gunicorn --pythonpath="$PWD/editdojo_project" config.wsgi:application
worker: python worker.py
worker: python manage.py rqworker default