pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                git branch: 'main', credentialsId: 'Ross Searle Github', url: 'https://github.com/Ross-s/expressthat.dev.git'
                script {
                    def dockerImage = docker.build("web:${env.BUILD_ID}", 'apps/web')
                }
            }
        }
    }
}
