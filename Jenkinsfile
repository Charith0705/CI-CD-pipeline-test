pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Charith0705/CI-CD-pipeline-test.git'
            }
        }
    stage('Build React App') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t cicd-demo-app .'
            }
        }


        stage('Test React App') {
            steps {
                dir('frontend') {
                    sh 'npm test -- --watchAll=false'
                }
            }
        }


        stage('Deploy Container') {
            steps {
                sh '''
                docker rm -f cicd-demo-container || true
                docker run -d -p 3000:3000 \
                --name cicd-demo-container cicd-demo-app
                '''
            }
        }
    }
}   
