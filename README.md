# 🧭 Kubernetes Basic Instructions

## 📌 1. Check Your Cluster Connection

```bash
kubectl cluster-info
kubectl get nodes
```

If nodes appear → your `kubectl` is connected correctly.

---

## 📌 2. Namespaces

### List namespaces

```bash
kubectl get ns
```

### Create a namespace

```bash
kubectl create namespace my-namespace
```

### Delete a namespace

```bash
kubectl delete namespace my-namespace
```

---

## 📌 3. Deployments

### Apply (create/update) a Deployment

```bash
kubectl apply -f deployment.yaml
```

### List deployments

```bash
kubectl get deployments
```

### See deployment details

```bash
kubectl describe deployment my-deployment
```

### Delete a deployment

```bash
kubectl delete deployment my-deployment
```

---

## 📌 4. Pods

### List pods

```bash
kubectl get pods
kubectl get pods -n my-namespace
```

### View pod logs

```bash
kubectl logs my-pod
```

For logs of a previous container:

```bash
kubectl logs -p my-pod
```

### Exec into a container

```bash
kubectl exec -it my-pod -- sh
```

### Delete (stop) a pod

```bash
kubectl delete pod my-pod
```

> If pod belongs to Deployment → Kubernetes will create a new one automatically.

---

## 📌 5. Services

### List services

```bash
kubectl get svc
```

### Apply service YAML

```bash
kubectl apply -f service.yaml
```

---

## 📌 6. Jobs & CronJobs

### Create a Job

```bash
kubectl apply -f job.yaml
```

### List Jobs

```bash
kubectl get jobs
```

### View pods belonging to a Job

```bash
kubectl get pods --selector=job-name=my-job
```

### Delete a Job (including its pods)

```bash
kubectl delete job my-job
```

### Prevent Job recreation after deletion

Add inside Job spec:

```yaml
spec:
  ttlSecondsAfterFinished: 300
```

---

## 📌 7. ConfigMaps & Secrets

### Create ConfigMap

```bash
kubectl create configmap my-config --from-file=config.json
```

### List ConfigMaps

```bash
kubectl get configmaps
```

### Create Secret

```bash
kubectl create secret generic my-secret --from-literal=password=123
```

---

## 📌 8. Files & Manifests

### Apply any Kubernetes YAML

```bash
kubectl apply -f your-file.yaml
```

### Delete by file

```bash
kubectl delete -f your-file.yaml
```

---

## 📌 9. Useful Shortcuts

### Describe any resource

```bash
kubectl describe <type> <name>
# e.g.
kubectl describe pod my-pod
```

### Get YAML of live resource

```bash
kubectl get deployment my-app -o yaml
```

---

## 📌 10. Debugging

### Show pod events

```bash
kubectl describe pod my-pod
```

### Watch pods in real-time

```bash
kubectl get pods -w
```

### Get all resources in namespace

```bash
kubectl get all -n my-namespace
```

---

## 📌 11. Argo CD Useful Commands

### Log in to Argo CD CLI

```bash
argocd login <ARGO_SERVER> --username admin --password <PASSWORD>
```

### List applications

```bash
argocd app list
```

### Get application details

```bash
argocd app get <app-name>
```

### Sync an application (deploy changes)

```bash
argocd app sync <app-name>
```

### Sync with prune

```bash
argocd app sync <app-name> --prune
```

### Refresh application state

```bash
argocd app refresh <app-name>
```

### Rollback to previous revision

```bash
argocd app rollback <app-name>
```

### Delete application

```bash
argocd app delete <app-name>
```

### Check Argo CD version

```bash
argocd version
```

### Port-forward Argo CD UI (if not using LoadBalancer)

```bash
kubectl port-forward svc/argocd-server -n argocd 8080:443
```

Then open: [https://localhost:8080](https://localhost:8080)
