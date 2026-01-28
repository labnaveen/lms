pipeline {
    agent any

    environment {
        COMPOSE_PROJECT_NAME = "lms"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git credentialsId: 'git-credentials',
                    url: 'https://github.com/labnaveen/lms.git',
                    branch: 'main'
            }
        }

        stage('Stop Existing Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Start Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Verify Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {
        success {
            echo 'LMS Deployment Successful 🎉'
        }
        failure {
            echo 'Deployment Failed ❌'
        }
        failure {
            cleanWs()
        }
    }
}
