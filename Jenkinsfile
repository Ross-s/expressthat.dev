pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    def ret = sh(script: 'ls', returnStdout: true)
                    print ret
                    def dockerImage = docker.build("web:${env.BUILD_ID}", 'apps/web/Dockerfile')
                }
            }
        }
    }
}
