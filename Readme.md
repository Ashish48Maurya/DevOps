### Step 1: IAM Configuration
- Create a user `eks-admin` with `AdministratorAccess`.
- Generate Security Credentials: Access Key and Secret Access Key.

### Step 2: EC2 Setup
- Launch an Ubuntu instance in your favourite region (eg. region `us-west-2`).
- SSH into the instance from your local machine.

### Step 3: Install AWS CLI v2
``` shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
sudo apt install unzip
unzip awscliv2.zip
sudo ./aws/install -i /usr/local/aws-cli -b /usr/local/bin --update
aws configure
```

### Step 4: Install Docker
``` shell
sudo apt-get update
sudo apt install docker.io
docker ps
sudo chown $USER /var/run/docker.sock
```


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
