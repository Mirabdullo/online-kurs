#!/bin/bash

if docker exec -it postgres-db psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -d ${POSTGRES_DB} -U ${POSTGRES_USER} -c '\q'; then
    echo "Database connection successful"
    exit 0
else
    echo "Database connection failed"
    exit 1
fi