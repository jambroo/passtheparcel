# Running Notes
export PROJECT_ID="passtheparcel-147616"

sudo docker build -t gcr.io/$PROJECT_ID/passtheparcel:v1 .
sudo gcloud docker push gcr.io/$PROJECT_ID/passtheparcel:v1

gcloud config set compute/zone asia-east1-a
gcloud container clusters create passtheparcel-asia-east --zone=asia-east1-a
gcloud container clusters get-credentials passtheparcel-asia-east --zone asia-east1-a --project passtheparcel-147616
kubectl run passtheparcel-asia-east --env="NAME=asia-east" --image=gcr.io/$PROJECT_ID/passtheparcel:v1 --port=8080
kubectl expose deployment passtheparcel-asia-east --type="LoadBalancer"

gcloud config set compute/zone us-west1-a
gcloud container clusters create passtheparcel-us-west --zone=us-west1-a
gcloud container clusters get-credentials passtheparcel-us-west --zone us-west1-a --project passtheparcel-147616
kubectl run passtheparcel-us-west --env="NAME=us-west" --image=gcr.io/$PROJECT_ID/passtheparcel:v1 --port=8080
kubectl expose deployment passtheparcel-us-west --type="LoadBalancer"

gcloud config set compute/zone us-central1-f
gcloud container clusters create passtheparcel-us-central --zone=us-central1-f
gcloud container clusters get-credentials passtheparcel-us-central --zone us-central1-f --project passtheparcel-147616
kubectl run passtheparcel-us-central --env="NAME=us-central" --image=gcr.io/$PROJECT_ID/passtheparcel:v1 --port=8080
kubectl expose deployment passtheparcel-us-central --type="LoadBalancer"

gcloud config set compute/zone us-east1-b
gcloud container clusters create passtheparcel-us-east --zone=us-east1-b
gcloud container clusters get-credentials passtheparcel-us-east --zone us-east1-b --project passtheparcel-147616
kubectl run passtheparcel-us-east --env="NAME=us-east" --image=gcr.io/$PROJECT_ID/passtheparcel:v1 --port=8080
kubectl expose deployment passtheparcel-us-east --type="LoadBalancer"

gcloud config set compute/zone europe-west1-b
gcloud container clusters create passtheparcel-eu-west --zone=europe-west1-b
gcloud container clusters get-credentials passtheparcel-eu-west --zone europe-west1-b --project passtheparcel-147616
kubectl run passtheparcel-eu-west --env="NAME=eu-west" --image=gcr.io/$PROJECT_ID/passtheparcel:v1 --port=8080
kubectl expose deployment passtheparcel-eu-west --type="LoadBalancer"

# Follow logs
gcloud container clusters get-credentials passtheparcel-asia-east --zone asia-east1-a --project passtheparcel-147616
kubectl get pods,services
kubectl logs -f passtheparcel-asia-east-990507707-6un6e

gcloud container clusters get-credentials passtheparcel-us-west --zone us-west1-a --project passtheparcel-147616
kubectl get pods,services
kubectl logs -f passtheparcel-us-west-503771355-q8iel

gcloud container clusters get-credentials passtheparcel-us-central --zone us-central1-f --project passtheparcel-147616
kubectl get pods,services
kubectl logs -f passtheparcel-us-central-2960192589-xim8h

gcloud container clusters get-credentials passtheparcel-us-east --zone us-east1-b --project passtheparcel-147616
kubectl get pods,services
kubectl logs -f passtheparcel-us-east-3186946201-12v3m

gcloud container clusters get-credentials passtheparcel-eu-west --zone europe-west1-b --project passtheparcel-147616
kubectl get pods,services
kubectl logs -f passtheparcel-eu-west-1031008433-vi6ep

# Close down
gcloud container clusters get-credentials passtheparcel-asia-east --zone asia-east1-a --project passtheparcel-147616
kubectl delete service,deployment passtheparcel-asia-east
gcloud container clusters get-credentials passtheparcel-us-west --zone us-west1-a --project passtheparcel-147616
kubectl delete service,deployment passtheparcel-us-west
gcloud container clusters get-credentials passtheparcel-us-central --zone us-central1-f --project passtheparcel-147616
kubectl delete service,deployment passtheparcel-us-central
gcloud container clusters get-credentials passtheparcel-us-east --zone us-east1-b --project passtheparcel-147616
kubectl delete service,deployment passtheparcel-us-east
gcloud container clusters get-credentials passtheparcel-eu-west --zone europe-west1-b --project passtheparcel-147616
kubectl delete service,deployment passtheparcel-eu-west

# Get clusters
gcloud container clusters list

# Delete all clusters
gcloud container clusters delete passtheparcel-asia-east passtheparcel-eu-west passtheparcel-us-central passtheparcel-us-east passtheparcel-us-west
