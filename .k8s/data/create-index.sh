#!/bin/sh

CDTN_POD_STATUS=$(kubectl get pod "$1")

# Check if cdtn-data pod exists
if [ "$CDTN_POD_STATUS" ]; then
  kubectl delete po "$1"
fi

kubectl apply -f ./deployment.yml
