import multiprocessing
import os
from dotenv import load_dotenv
load_dotenv()

name = "Hello"

accesslog = "/home/ubuntu/var/54.228.253.219/DashboardBack/gunicorn-access.log"
errorlog = "/home/ubuntu/var/54.228.253.219/DashboardBack/gunicorn-error.log"

bind = "0.0.0.0:8000"

worker_class = "uvicorn.workers.UvicornWorker"
workers = multiprocessing.cpu_count () * 2 + 1
worker_connections = 1024
backlog = 2048
max_requests = 5120
timeout = 120
keepalive = 2

debug = os.environ.get("debug", "false") == "true"
reload = debug
preload_app = False
daemon = False





