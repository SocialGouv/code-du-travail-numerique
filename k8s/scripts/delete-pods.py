from subprocess import check_output

def get_merged_branches():
  merged_branches_list = []
  raw_merged_branches = check_output('git branch -r --merged master', shell=True)
  for  merged_branch in raw_merged_branches.decode('utf-8').split('\n'):
    if merged_branch and merged_branch.strip() != 'origin/master' and merged_branch.strip() != 'origin/HEAD -> origin/master':
      merged_branches_list.append(merged_branch.replace('origin/','').replace('/','-').strip())
  return merged_branches_list

def get_pod_to_delete(label):
  pod_to_delete_list = []
  check_pod = ('kubectl get po --selector app='+label)
  print(check_pod)
  active_pod = check_output(check_pod , shell=True)
  if active_pod:
    pod_to_delete_list.append(label)
  else:
    print('No pod with label:',label)
  return pod_to_delete_list

def delete_pod(label):
  k8s_object_list = ["pod", "service", "ingress", "configmap"]
  for k8s_object in k8s_object_list:
    command_to_delete_k8s_object = ('kubectl delete '+ k8s_object +' --selector branch=cdtn-'+label)
    check_output(command_to_delete_k8s_object, shell=True)

if __name__ == '__main__':
  for merged_branch in get_merged_branches():
    for pod_to_delete in get_pod_to_delete(merged_branch):
      delete_pod(pod_to_delete)
