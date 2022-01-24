#!/bin/bash

SCRIPT_DIR=$(cd $(dirname $0); pwd)
PROJECT_ROOT=$(cd $(dirname $0)/..; pwd)

cd $PROJECT_ROOT

export $(cat api/.env | grep -v -e "^ *#")

MYSQL_PWD="$DB_PASSWORD" mysql -u "$DB_USER" -h "$DB_HOST" -P "$DB_PORT" "$DB_NAME"