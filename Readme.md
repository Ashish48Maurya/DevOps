### Step 1: EC2 Setup
- Launch an Ubuntu instance in your favourite region (eg. region `us-west-2`).
- SSH into the instance from your local machine.

### step 2: Clone Repo containing (Microservices) Frontend and Backend Code

### Step 3: Install Docker
``` shell
sudo apt-get update
sudo apt install docker.io
docker ps
sudo chown $USER /var/run/docker.sock
```

### Step 4: IAM Configuration
- Create a user `eks-admin` with `AdministratorAccess`.
- Generate Security Credentials: Access Key and Secret Access Key.

### Step 5: Install AWS CLI v2
``` shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
aws configure
```

### You Can Skip all above steps if your local system has aws cli installed

### Step 6: Store Container on AWS ECR 

# Container Orchestration and Kubernetes (K8s)
## Introduction  
Many companies and startups use containerized services. For example, Google's Gmail service experiences fluctuating traffic. During high traffic, Google needs to manually increase the number of containers to handle the load and scale them down during low traffic. This manual process requires 24/7 monitoring, which is tedious and inefficient.  
To address this, Google developed **Borg**, an internal system for managing containers. While Borg is not open source, its developers later created **Kubernetes (K8s)**—an open-source container orchestration platform based on Borg—allowing others to benefit from its capabilities.


---

## What is Kubernetes (K8s)?  
**Kubernetes (K8s)** is an open-source container orchestration platform inspired by Borg.  
- Created by engineers like **Joe Beda**, **Brendan Burns**, and **Craig McLuckie**.  
- Released to the public in **2014**.  
- Solves the same problems Borg does but is designed for **everyone**, not just Google.  

---

## What is Container Orchestration?  
Container orchestration automates the management of containerized applications. It handles tasks such as:  
- **Scaling**: Adjusting the number of containers based on demand.  
- **Deployment**: Automating application releases and updates.  
- **Load Balancing**: Distributing traffic across multiple containers.  
- **Self-Healing**: Restarting or replacing failed containers automatically.  
- **Resource Allocation**: Optimizing the use of CPU, memory, and other resources.  
- **Monitoring**: Tracking performance and maintaining logs for debugging and analytics.  

---

## Simplified AWS ECS Architecture Overview
![image](https://github.com/Ashish48Maurya/DevOps/blob/master/picture/image.png)
![image](https://github.com/Ashish48Maurya/DevOps/blob/master/picture/image1.png)
- **Cluster**
A Cluster is like a container hub where your applications (in the form of containers) run.
It groups your compute resources (EC2 instances or Fargate tasks) needed to run the containers.
Key Point: A cluster can manage multiple services, which in turn run tasks based on traffic needs.
- **Services**
A Service ensures your application (containerized tasks) runs properly.
It handles:
Auto-scaling: Adjusts the number of tasks based on load or demand.
Task Management: Restarts failed tasks and keeps the correct number running.
Deployment: Runs containers using a set configuration (e.g., container image, environment variables).
Key Point: Each service manages one or more tasks.
- **Tasks**
A Task is the smallest deployable unit in ECS, like a running instance of your containerized app.
It’s defined by a Task Definition, which specifies:
Where the container image is stored (e.g., Amazon ECR, Docker Hub).
Resources it needs (CPU, memory).
Environment variables and networking settings.
Key Point: Services run and scale tasks based on traffic.
- **Workflow**
Define a Task Definition with your app's container image and settings.
Create a Service to run and manage tasks using that definition.
Add the Service to a Cluster to handle deployment, scaling, and task management.
- **Scaling**
ECS supports horizontal scaling:
Automatically adjusts the number of tasks based on performance metrics (e.g., CPU usage, memory).
Key Point: This ensures apps run smoothly and cost-efficiently.


## Why AWS ECS is Not Ideal
ECS performs similar tasks to Kubernetes, but with AWS, you're locked into their ecosystem. To use ECS, you need to write deployment and CI/CD configuration code specific to AWS. If you want to deploy your container to other services like DigitalOcean, you'll have to rewrite the configuration code, as the code used in AWS won't work. Additionally, if you've used AWS cloud-native services like Auto Scaling Groups (ASG), Elastic Load Balancing (ELB), or CloudFront, these features are not available in DigitalOcean, so you would need to rewrite many aspects of your infrastructure.
This is a major drawback of ECS. On the other hand, Kubernetes (K8s) is cloud-agnostic. You write deployment configurations in a standardized format, which can be used across any cloud provider, such as AWS, DigitalOcean, Bare Metal (own servers), or GCP. It works seamlessly across different environments, which is why its architecture is a bit more complex.

---

## Problems Kubernetes Solves  

### Before Kubernetes  
Companies had to:  
- Manually monitor services 24/7 for traffic spikes or dips.  
- Manually scale containers during high traffic and reduce them during low traffic to save resources.  

### How Kubernetes Helps  
Kubernetes automates container orchestration by providing:  
1. **Auto-Scaling**  
   - Kubernetes uses features like **Horizontal Pod Autoscaler (HPA)** to dynamically add or remove containers (pods) based on metrics such as CPU, memory, or custom application metrics.  
2. **Self-Healing**  
   - If a container crashes or becomes unhealthy, Kubernetes automatically restarts or replaces it.  
3. **Load Balancing**  
   - Kubernetes distributes traffic across healthy containers to ensure performance and reliability.  
4. **Resource Efficiency**  
   - Kubernetes optimizes resource usage by dynamically adjusting workloads across nodes.  

---

## Conclusion  
Kubernetes revolutionizes container orchestration by automating tasks that previously required manual intervention. With its features like auto-scaling, self-healing, and resource optimization, Kubernetes has become a vital tool for modern software deployment and scalability.
