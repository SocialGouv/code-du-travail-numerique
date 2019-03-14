#!/bin/sh

CDTN_POD_STATUS=$(kubectl get pod cdtn-data"$1")

# Check if cdtn-data pod exists
if [ ! "$CDTN_POD_STATUS" ]
then
    kubectl apply -f k8s/code-du-travail-data/deployment-cdtn-data.yml
else
    kubectl delete po cdtn-data"$1"
    kubectl apply -f k8s/code-du-travail-data/deployment-cdtn-data.yml
fi
