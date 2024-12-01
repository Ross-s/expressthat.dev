pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    def dockerImage = docker.build("web:${env.BUILD_ID}", 'apps/web/Dockerfile')
                }
            }
        }
    }
}
