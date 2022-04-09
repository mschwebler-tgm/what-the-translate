#!/bin/bash


exitfn() {
  trap SIGINT

  docker stop $dockerContainerName
  kill -9 $(pidof node)  # clean up zombie processes if necessary

  exit
}

trap "exitfn" INT


# serverless-offline
cd backend && IS_LOCAL=true NODE_ENV=dev sls offline start --stage dev --noAuth
