# **Panelista Project Documentation**

## **1. Project Overview**

**Panelista** is a web application designed to assist event organizers in finding diverse speakers. The project includes a Django-based backend and a React-based frontend. It uses PostgreSQL as its database and is containerized with Docker to facilitate easy deployment.

### **Technology Stack**

- **Backend**: Django, Django REST Framework
- **Frontend**: React, Vite, TailwindCSS
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx
- **CI/CD**: GitHub CI/CD

## **2. Getting Started**

### **Prerequisites**

Ensure you have the following tools installed on your local machine:

- **Docker**
- **Git**
- **Node.js** and **npm** (for frontend development)
- **Conda** (for managing the Python environment in the backend)

### **Repository**

The project is delivered as a `.zip` file. After unzipping, upload the contents to your GitHub repository, including all essential folders and files such as source code, configuration files, and environment files (`envs`).

### **Instructions for Uploading to GitHub**

1. **Unzip the File**: Unzip the `.zip` file on your local machine.
2. **Create a New Repository on GitHub**: Create a new repository in your GitHub account.
3. **Upload the Files**: Upload all the unzipped files to the new GitHub repository using the web interface or by initializing a Git repository locally and pushing the files.

This ensures the project is properly set up in your GitHub account.

### **GitHub Setup**

This section covers setting up GitHub-related resources, including the GitHub Container Registry.

1. **Create a GitHub Personal Access Token**:
   - Instructions on creating the PAT with the necessary permissions.
   - Mention that this token will be used for pushing and pulling Docker images.
2. **Setting Up GitHub Container Registry**:
   - Log in to GHCR, build and tag Docker images, and push them to GHCR.

### **Environment Variables**

The environment variable files (`dev.env` and `prod.env`) are located in the `envs` folder in the project’s root directory. Ensure these files are correctly placed when setting up the project.

**Note**: Review the values in these files to ensure they are appropriate for your environment, especially for production (`prod.env`).

### **Instructions for Use**

1. **Ensure Correct Placement**: Ensure the `envs` folder with `dev.env` and `prod.env` files is in the root directory of the project.
2. **Check and Update Values**: Verify that the values within these files match your intended environment setup, particularly database credentials.

### **Setting Up GitHub Container Registry**

1. **Create a GitHub Personal Access Token**:
   - Generate a PAT with `read:packages`, `write:packages`, and `delete:packages` permissions in your GitHub account under **Developer settings** > **Personal access tokens**.
2. **Login to GitHub Container Registry**:

   - Use the token to log in to GHCR:

   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
   ```

3. **Build and Tag Your Docker Image**:

   - Build and tag your Docker image:

   ```bash
   docker build -t ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME:tag .
   ```

4. **Push the Image to GitHub Container Registry**:

   ```bash
   docker push ghcr.io/YOUR_GITHUB_USERNAME/YOUR_REPOSITORY_NAME:tag
   ```

## **3. Local Development Setup**

### **Backend Setup**

1. **Start the Development Environment**:

   - Use Docker Compose to set up and start the backend and database services:

   ```bash
   docker-compose -f docker-compose.dev.yml up --build
   ```

2. **Migrations and Server**:
   - The `dev.sh` script will handle database migrations and start the Django development server on `http://localhost:8000`.

### **Frontend Setup**

1. **Install Frontend Dependencies**:

   - Navigate to the `frontend` directory and install the required dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. **Start the Frontend Development Server**:

   - Start the Vite development server:

   ```bash
   npm run dev
   ```

   The frontend will be accessible at a similar address to `http://localhost:3000`. Vite will display the correct address in the terminal after you start the development server.

### **Accessing the Application**

- **Backend**: `http://localhost:8000`
- **Frontend**: `http://localhost:3000` (or similar)

## **4. Production Deployment**

### **Building and Deploying**

1.  **Prepare Environment**:
    - Ensure the `prod.env` file is configured with your production environment values.
2.  **DigitalOcean Droplet Setup:**:

- Create a Virtual Server Droplet on DigitalOcean:

  - Log in to your DigitalOcean account.
  - Click on the Create button and select Droplets.
  - Configure the droplet with the following specs:

    - Region: Frankfurt
    - Datacenter: Frankfurt
    - VPC Network: No VPC (default configuration)
    - Image: Ubuntu (22.04)
    - Droplet Type: Basic
    - CPU Options: Regular (SSD), $4/month
    - Authentication Method: SSH Key
    - Recommended Options: Select “Add improved metrics monitoring and alerting (free)”
    - Add Tags: Type some project-related keywords (optional)

      ▪ Note: Opt for the cheapest option initially, as you can always upgrade later. Enabling improved metrics monitoring and alerting helps you track your droplet’s CPU usage, memory usage, disk usage, and network usage.

- Add Your SSH Key: - If you don’t have an SSH key yet, follow these steps:

  - For MacOS or Linux:

  1. Open a terminal.
  2. Generate an SSH key with:

     ```bash
     ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
     ```

  3. Follow the prompts to save the key and create a passphrase.
  4. Add your SSH key to the SSH agent:

  ```bash
  eval "$(ssh-agent -s)"
  ssh-add ~/.ssh/id_rsa
  ```

  5. Copy the SSH key to your clipboard:

  ```bash
    cat ~/.ssh/id_rsa.pub
  ```

  For Windows:

  - Use a tool like PuTTYgen to generate an SSH key.
  - Save the private key and copy the public key.
  - Add your SSH key to PuTTY or your preferred SSH client.

3.  **Setup a New Sudo User:**

    - Root access is not recommended for daily management. Create a new user with sudo privileges:
      • Follow this DigitalOcean tutorial to set up a new sudo-enabled user. https://www.digitalocean.com/community/tutorials/how-to-create-a-new-sudo-enabled-user-on-ubuntu
      • Follow step 5 of this DigitalOcean tutorial to add an SSH key to your new user. https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu#step-5-enabling-external-access-for-your-regular-user
      • For security, disable root login via SSH as described in this DigitalOcean tutorial. https://www.digitalocean.com/community/tutorials/how-to-disable-root-login-on-ubuntu-20-04#step-2-mdash-disabling-root-login

4.  **Set Up a Firewall:**

- UFW (Uncomplicated Firewall) is preinstalled on Ubuntu.
  • Check UFW status:
  ```bash
  sudo ufw status
  ```
  • Allow SSH connections:

```bash
sudo ufw allow 22/tcp
```

• Enable UFW if it’s not already enabled:

```bash
sudo ufw enable
```

• Verify UFW status again:

```bash
sudo ufw status
```

5.  **Update the System:**

- Run these commands to update your system:

```bash
sudo apt update
sudo apt upgrade
```

6.  **Install and Configure Nginx:**

- Install Nginx:

```bash
sudo apt install nginx
```

- Allow HTTP and HTTPS traffic through UFW:

```bash
sudo ufw allow 'Nginx Full'
```

- Verify Nginx status:

```bash
systemctl status nginx
```

7.  **Add a Domain and Landing Page:**

    - In DigitalOcean, create a subdomain for your droplet:
      • Add a domain name by creating a subdomain in DigitalOcean.
      • In “Will direct to,” select your droplet.
    - You can now visit your website by entering the domain name in your browser.

8.  **Build and Deploy with Docker Compose: Deploy the application using Docker Compose:**

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```

This will build and start the backend, frontend, PostgreSQL database, and Nginx server.

### **Nginx Configuration**

The Nginx configuration is in the `nginx` directory. Review the `server_name` and SSL certificate paths before deployment.

## **5. CI/CD Pipeline**

### **Current Setup with GitLab**

The project uses GitLab CI/CD for automated build, linting, and deployment processes. The pipeline involves stages like pulling the latest image, building the Docker container, pushing the image to the GitLab container registry, and deploying it.

### **Transitioning to GitHub with DigitalOcean or HostPoint**

If migrating to GitHub and using DigitalOcean or HostPoint, adapt the CI/CD pipeline from GitLab to GitHub Actions.

### **Setting Up GitHub Actions**

1. **Create a Workflow File**:

- In the `.github/workflows` directory, create `deploy.yml`:

```yaml
name: CI/CD Pipeline


# Trigger the workflow on push to the main or master branch, or manually
on:
  push:
    branches:
      - main
      - master
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    # Step 1: Check out the repository
    - name: Check out the repository
      uses: actions/checkout@v2

    # Step 2: Set up Docker Buildx for multi-platform builds
    - name: Set up Docker Buildx
      uses: docker/setup-buildx-action@v1

    # Step 3: Log in to GitHub Container Registry
    - name: Log in to GitHub Container Registry
      uses: docker/login-action@v1
      with:
        registry: ghcr.io
        username: ${{ github.actor }}
        password: ${{ secrets.PAT_TOKEN }}

    # Step 4: Build and push Docker images to GitHub Container Registry
    - name: Build and push Docker image
      run: |
        docker build -t ghcr.io/magicmiren/panelista:latest .
        docker build -t ghcr.io/magicmiren/panelista:master .
        docker push ghcr.io/magicmiren/panelista:latest
        docker push ghcr.io/magicmiren/panelista:master

  deploy:
    runs-on: ubuntu-latest
    needs: build

    steps:
    # Step 1: Deploy to DigitalOcean Droplet using SSH
    - name: Deploy to DigitalOcean Droplet
      uses: docker/login-action@v1
      with:
        host: ${{ secrets.DROPLET_IP }}
        username: ${{ secrets.DROPLET_USER }}
        key: ${{ secrets.SSH_PRIVATE_KEY }}
        script: |
          cd ../../
          docker-compose down
          docker-compose pull
          docker-compose up -d

```

### **Setting Up Secrets in GitHub**

- **DROPLET_IP**
- **DROPLET_USER**
- **PAT_TOKEN**

### **Server Configuration**

For both DigitalOcean and HostPoint, ensure Docker and Docker Compose are installed on the server, and that the environment files and Docker Compose file are correctly configured.

## **6. Database Management**

### **Migrations**

To apply database migrations in production:

```bash
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate
```

### **Backup and Restore**

To back up the PostgreSQL database:

```bash
docker-compose exec postgres pg_dump -U postgres postgres > backup.sql
```

To restore from a backup:

```bash
docker-compose exec -T postgres psql -U postgres postgres < backup.sql
```

## **7. API Documentation**

The API documentation is available through Swagger at `/backend/api/docs`. This documentation is automatically generated and provides details on all available endpoints.

### **Key Endpoints**

- **User Registration and Authentication**: `/backend/api/auth/`
- **Speakers Management**: `/backend/api/speakers/`
- **Events Management**: `/backend/api/events/`
- **Reviews Management**: `/backend/api/reviews/`
- **Chatbot (Placeholder)**: `/backend/api/chat/`

## **8. Code Structure**

The project is organized into three main sections: **Frontend**, **Backend**, and **DevOps**.

## Frontend Structure

The frontend is developed using **React**, **Vite**, and **TailwindCSS**. The directory structure for the frontend is as follows:

- **`public/`**: Contains static assets, including the main `index.html` file.
- **`src/`**: The source code for the React application.
  - **`assets/`**: Stores images and other static assets used within the React components.
  - **`axios/`**: Contains Axios instances for making HTTP requests, e.g., `AxiosPanelista`, `AxiosDocsBot`.
  - **`components/`**: Contains all the React components, organized by feature.
    - **`About/`**, **`Home/`**, **`Login/`**, **`SpeakersAll/`**, etc.: Each folder corresponds to a specific feature or page.
  - **`hook/`**: Custom React hooks used throughout the application.
  - **`routes/`**: Defines application routes using `react-router-dom`.
  - **`store/`**: Contains Redux store configuration.
  - **`App.jsx`**: Main application component that sets up routes and Redux.
  - **`index.jsx`**: Entry point for the React application.
  - **`index.css`**: Global styles for the application.

## Backend Structure

The backend is built with **Django** and is organized as follows:

- **`backend/`**: Root directory for the backend.
  - **`project/`**: Contains the main configuration files for the Django project.
    - **`settings.py`**, **`urls.py`**, **`wsgi.py`**, **`asgi.py`**: Core configuration files.
  - **`user/`**, **`speaker/`**, **`organizer/`**, **`event/`**, **`review/`**: Django apps representing specific features of the backend.
  - **`media-files/`**: Directory for storing uploaded media.
  - **`templates/`**: Contains HTML templates used by Django.
  - **`manage.py`**: Command-line utility for managing the Django project.
  - **`requirements.yml`**: Lists Python dependencies required by the project.

## DevOps Structure

The **DevOps** section includes configurations and scripts for deploying, managing, and monitoring the application.

- **Nginx Configuration**:

  - **`nginx/`**: Contains Nginx configuration files.
    - **`default.conf`**: Configures Nginx as a reverse proxy to handle traffic between the frontend and backend.

- **Scripts**:

  - **`scripts/`**: Contains utility scripts for running and deploying the application.
    - **`dev.sh`**: Script for starting the development environment.
    - **`prod.sh`**: Script for preparing and running the application in production.

- **Docker Configuration**:

  - **Docker Files**:
    - **`Dockerfile`**: Instructions for building the Docker image.
    - **`docker-compose.yml`**: Configuration for orchestrating Docker containers.
    - **`docker-compose.ci.yml`**: Docker Compose configuration for CI processes.
    - **`docker-compose.deploy.yml`**: Docker Compose configuration for production deployment.

- **CI/CD Configuration**:
  - **GitHub Actions**:
    - **`.github/workflows/deploy.yml`**: GitHub Actions workflow file for CI/CD (if using GitHub Actions).

## Environment and Configuration

- **`envs/`**: Directory containing environment-specific configuration files.
  - **`dev.env`**: Environment variables for development.
  - **`prod.env`**: Environment variables for production.

## **9. Support**

### **For additional support or queries, please contact the development team.**
