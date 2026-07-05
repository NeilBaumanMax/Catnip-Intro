#!/bin/bash
# Start nginx with project config
# Usage: ./start-nginx.sh [start|stop|reload]

NGINX_BIN=/Users/neil/devtools/nginx/sbin/nginx
CONF=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )/nginx.conf
PREFIX=/Users/neil/devtools/nginx

case "${1:-start}" in
  start)
    echo "Starting nginx on port 8080..."
    $NGINX_BIN -c "$CONF" -p "$PREFIX"
    echo "Done. Visit http://localhost:8080"
    ;;
  stop)
    echo "Stopping nginx..."
    $NGINX_BIN -s stop -c "$CONF" -p "$PREFIX"
    ;;
  reload)
    echo "Reloading nginx..."
    $NGINX_BIN -s reload -c "$CONF" -p "$PREFIX"
    ;;
  *)
    echo "Usage: $0 [start|stop|reload]"
    ;;
esac
