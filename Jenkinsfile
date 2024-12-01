pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    def dockerImage = docker.build("web:${env.BUILD_ID}", '--build-arg "BUILD_PATH=/home/jenkins/workspace/${JOB_NAME}" type=bind,source=/home/jenkins/workspace/,target=/home/jenkins/workspace/ apps/web')
                }
            }
        }
    }
}
