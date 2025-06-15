# DevOps Assignment

A simple Node.js web application containerized with Docker and deployed on AWS EC2. The app displays a DevOps dashboard with system information and server status.

## 📋 Assignment Deliverables ✅
- [x] GitHub repo link
- [x] Dockerfile
- [x] Screenshot of app running locally in Docker
- [x] Screenshot of EC2 dashboard
- [x] Screenshot of SSH terminal session
- [x] Screenshot of app running via public EC2 IP
- [x] Clear documentation with commands used

## 🛠️ Prerequisites
- AWS account (free tier eligible)
- Node.js installed locally
- Docker Desktop installed
- Git installed
- SSH client (Windows PowerShell/Linux Terminal)

## 🚀 Quick Start

### Running Locally
```bash
npm install
node app.js
```
Visit: http://localhost:3000

### With Docker
```bash
docker build -t devops-assignment-app .
docker run -p 3000:3000 devops-assignment-app
```

## 🏗️ Project Structure
```
devops-assignment/
├── node_modules/
├── screenshots/
│   ├── AWS-Phase 3/
│   │   ├── SSH Terminal Screenshots/
│   │   │   ├── curl_http.png
│   │   │   ├── curl_localhost.png
│   │   │   ├── Docker_logs.png
│   │   │   ├── docker_running.png
│   │   │   ├── docker_status.png
│   │   │   └── ssh_connection.png
│   │   ├── ec2-app-running.png
│   │   └── ec2-dashboard.png
│   └── Docker-Phase 2/
│       ├── docker_commands.png
│       ├── docker_desktop_gui.png
│       └── local_app_browser.png
├── .dockerignore
├── .gitignore
├── app.js
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

## 📝 Step-by-Step Implementation

### Phase 1: Application Development
Created a Node.js Express application that displays:
- Welcome message for DevOps assignment
- Server timestamp and system information
- Container status when running in Docker
- Basic health check endpoint

### Phase 2: Dockerization
Built a Dockerfile with multi-stage optimization:
- Base image: `node:18-alpine` (lightweight)
- Proper layer caching with package files copied first
- Non-root user for security
- Health check implementation

**Key Docker commands used locally:**
```bash
docker build -t devops-assignment-app .
docker run -d -p 3000:3000 --name devops-app devops-assignment-app
docker ps
docker logs devops-app
```

### Phase 3: AWS EC2 Deployment

#### 3.1 Windows SSH Key Setup (PowerShell)
```powershell
# Navigate to Downloads folder
cd Downloads

# Check for the key file
dir *.pem

# Fix Windows permissions for SSH key
icacls devops-assignment-key.pem /inheritance:r
icacls devops-assignment-key.pem /grant:r "Jia Harisinghani:R"
```

#### 3.2 SSH Connection to EC2
```bash
# Connect to EC2 instance
ssh -i devops-assignment-key.pem ec2-user@13.60.22.216
```

#### 3.3 Docker Installation on EC2
```bash
# Update system packages
sudo yum update -y

# Install Docker (was already installed in my case)
sudo yum install docker -y

# Start Docker service
sudo systemctl start docker

# Enable Docker to start on boot
sudo systemctl enable docker

# Add current user to docker group
sudo usermod -a -G docker ec2-user

# Apply group changes without logout
newgrp docker

# Verify Docker installation
docker --version
```

#### 3.4 Application Deployment Process
```bash
# Check current containers
docker ps

# Initial attempt to build (failed - no Dockerfile on EC2)
docker build -t devops-assignment-app .

# Multiple attempts to load corrupted tar file
docker load < devops-app.tar  # Failed - invalid tar header

# Successful image load with corrected tar file
docker load < devops-app-fixed.tar

# Run the application container
docker run -d --name devops-app -p 3000:3000 devops-assignment-app:latest

# Verify container is running
docker ps
```

#### 3.5 System Verification Commands
```bash
# Check current user
whoami

# Check current directory
pwd

# Check hostname
hostname

# Verify Docker version
docker --version
```

## 🔧 Technical Specifications
- **Application**: Node.js Express server
- **Docker Base Image**: node:18-alpine
- **AWS Instance**: t2.micro (Amazon Linux 2023)
- **AWS Region**: eu-north-1
- **Ports**: 3000 (application), 22 (SSH)
- **Docker Version**: 25.0.8
- **Container Runtime**: Docker Engine

## 🐛 Issues Encountered & Solutions

### 1. SSH Key Permissions (Windows)
**Problem**: Windows file permissions preventing SSH key usage
**Solution**: Used `icacls` commands to set proper permissions
```powershell
icacls devops-assignment-key.pem /inheritance:r
icacls devops-assignment-key.pem /grant:r "Username:R"
```

### 2. Docker Image Transfer
**Problem**: Initial tar file was corrupted during transfer
**Solution**: Re-created and verified tar file integrity before transfer
```bash
# Check file type
file devops-app.tar

# Multiple load attempts with fixed tar
docker load < devops-app-fixed.tar
```

### 3. Missing Dockerfile on EC2
**Problem**: Attempted to build without source code on EC2
**Solution**: Used Docker image export/import method instead
```bash
# Local: Save image as tar
docker save devops-assignment-app > devops-app.tar

# EC2: Load image from tar
docker load < devops-app-fixed.tar
```

## 🔒 Security Considerations
- SSH key stored securely with restricted permissions
- Security group configured with minimal required ports (22, 80, 3000)
- Docker containers run as non-root user
- Application doesn't store or process sensitive data

## 📊 Testing & Verification
**Local Testing:**
```bash
curl http://localhost:3000
docker logs devops-app
```

**EC2 Testing:**
```bash
curl http://localhost:3000  # Internal testing
curl http://13.60.22.216:3000  # External access
docker ps  # Container status
docker logs devops-app  # Application logs
```

## 🔗 Project Links
- **GitHub Repository**: [DevOps Assignment](https://github.com/Jia2005/Devops-Assignment)
- **Screenshots & Documentation**: [Google Drive](https://drive.google.com/drive/folders/1Slnr2Jwm4YjasC67Ga1G5L2ZL4PxKQ4l?usp=drive_link)

## 📚 Complete Command Reference

### Local Development
```bash
npm install
node app.js
docker build -t devops-assignment-app .
docker run -d -p 3000:3000 --name devops-app devops-assignment-app
docker ps
docker logs devops-app
docker save devops-assignment-app > devops-app.tar
```

### Windows SSH Setup
```powershell
cd Downloads
dir *.pem
icacls devops-assignment-key.pem /inheritance:r
icacls devops-assignment-key.pem /grant:r "Username:R"
ssh -i devops-assignment-key.pem ec2-user@EC2-IP
```

### EC2 Setup & Deployment
```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user
newgrp docker
docker --version
docker load < devops-app-fixed.tar
docker run -d --name devops-app -p 3000:3000 devops-assignment-app:latest
docker ps
whoami
pwd
hostname
```

## 🚀 Future Enhancements
- Implement CI/CD pipeline with GitHub Actions
- Use Docker Hub for image registry
- Add comprehensive health checks and monitoring
- Implement load balancing with AWS ALB
- Add environment-specific configurations
- Set up automated backups and disaster recovery

## ⏱️ Time Investment
**Total Time**: ~4 hours
- Application Development: 1 hour
- Dockerization: 1 hour  
- AWS Setup & Deployment: 1.5 hours
- Documentation & Screenshots: 0.5 hours

## 🎯 Key Learning Outcomes
- Docker containerization and image management
- AWS EC2 instance configuration and security groups
- SSH key management across different operating systems
- Container orchestration and troubleshooting
- DevOps documentation and process recording
