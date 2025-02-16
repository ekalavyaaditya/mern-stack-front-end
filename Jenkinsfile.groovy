pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'jenkinsfront-end'
        PROJECT_ID = '27fd3e840d72'
        COMPUTE_ZONE = 'us-central1-c'
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE -f Dockerfile.dev .'
                }
            }
        }
        
        stage('Run Tests') {
            steps {
                script {
                    sh 'docker run -e CI=true $DOCKER_IMAGE npm test -- --coverage'
                }
            }
        }
        
        stage('Decrypt Service Account') {
            steps {
                script {
                    sh 'openssl enc -aes256 -d -in serviceAccount.json.enc -out serviceAccount.json -k $SERVICE_KEY'
                }
            }
        }
        
        stage('Setup Google Cloud SDK') {
            steps {
                script {
                    sh '''
                        if [ ! -d "$HOME/google-cloud-sdk/bin" ]; then 
                            rm -rf $HOME/google-cloud-sdk; 
                            export CLOUDSDK_CORE_DISABLE_PROMPTS=1; 
                            curl https://sdk.cloud.google.com | bash; 
                        fi
                        source /home/jenkins/google-cloud-sdk/path.bash.inc
                        gcloud auth activate-service-account --key-file serviceAccount.json
                        gcloud config set project $PROJECT_ID
                        gcloud config set compute/zone $COMPUTE_ZONE
                    '''
                }
            }
        }
        
        stage('Build Production Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE .'
                }
            }
        }
        
        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: 'docker-hub-credentials', url: '']) {
                        sh 'docker push $DOCKER_IMAGE'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh 'bash ./deploy.sh'
                }
            }
        }
    }
}