#!/bin/bash
# Ne lance Node que s'il n'est pas déjà lancé
pgrep -f server.js > /dev/null || nohup /usr/local/bin/node server.js &

