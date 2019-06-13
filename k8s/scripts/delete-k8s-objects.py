from subprocess import check_output
import hashlib
import os
import json
from urllib import request

# This script compares the active remote branches and active k8s tags.
# If a k8s tag doesn't match an active hashed remote branches name's, we delete all the k8s objects with this k8s tag.
github_token = os.environ["GITHUB_TOKEN"]
hash_size = int(os.environ["HASH_SIZE"])

def get_active_branches():
  response = request.urlopen("https://{}@api.github.com/repos/SocialGouv/code-du-travail-numerique/pulls".format(github_token))
  active_branches = [branch.get("head").get("ref") for branch in json.loads(response.read())]
  return [
    hashlib.sha1(branche).hexdigest()[:hash_size]
    for branche in active_branches
  ]

def get_active_k8s_tags():
  raw_k8s_tag_list = check_output("kubectl get pods -o go-template --template '{{range .items}}{{.metadata.labels.branch}}{{end}}'", shell=True).decode("utf-8")
  k8s_tag_list = raw_k8s_tag_list.replace('<no value>','').split('cdtn-')
  return [
    k8s_tag
    for k8s_tag in k8s_tag_list if k8s_tag
  ]

def delete_k8s_object(label):
  k8s_object_list = ["service", "ingress", "configmap", "deployments", "statefulset", "pod"]
  for k8s_object in k8s_object_list:
    command_to_delete_k8s_object = ('kubectl delete '+ k8s_object +' --selector branch=cdtn-'+label)
    check_output(command_to_delete_k8s_object, shell=True)

def get_k8s_tag_to_delete(active_k8s_tag_list=[], active_branch_list=[]):
    k8s_tag_list_to_delete = []

    active_tags = [
        tag for tag in active_k8s_tag_list if tag != ""
    ]
    deletable_tags = [
        tag
        for tag in active_tags
        if tag not in active_branch_list
    ]

    for tag in deletable_tags:
        k8s_tag_list_to_delete.append(tag)
    return k8s_tag_list_to_delete

if __name__ == '__main__':
  for k8s_tag_to_delete in get_k8s_tag_to_delete(get_active_k8s_tags(), get_active_branches()):
    # delete_k8s_object(k8s_tag_to_delete)
    print('k8s objects with label branch=cdtn-'+k8s_tag_to_delete+' have been deleted')
