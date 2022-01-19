#!/bin/bash

PROJECT_DIR=$(cd $(dirname $0)/..; pwd)
SCRIPT_DIR=$(cd $(dirname $0); pwd)

cd $PROJECT_DIR

npm run dev
