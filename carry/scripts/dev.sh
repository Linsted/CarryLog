#!/bin/bash

concurrently --kill-others-on-fail \
-n "DOCKER-RMQ,DOCKER-ACCOUNT,DOCKER-REDIS,DOCKER-ORDER,ACCOUNT,ORDER,DELIVERY" \
-c "blue,blue,cyan,blue,green,yellow,cyan" \
"cd libs/rabbit-mq && docker-compose --env-file ../../envs/.rmq.env up 2>&1 | grep -iE 'error|warning'" \
"cd apps/account && docker-compose up 2>&1 | grep -iE 'error|warning'" \
"cd libs/auth && docker-compose --env-file ../../envs/.redis.env up 2>&1 | grep -iE 'error|warning'" \
"cd apps/order && docker-compose up 2>&1 | grep -iE 'error|warning'" \
"nx serve account --watch" \
"nx serve order --watch" \
"nx serve delivery --watch"