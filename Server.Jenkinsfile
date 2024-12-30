pipeline {
  agent any
  environment {
    DOCKER_REGISTRY = credentials('nexus-url')
  }
  stages {
    stage('Build') {
      steps {
        parallel(
          'admin': {
            script {
              withCredentials([string(credentialsId: 'nexus-url', variable: 'DOCKER_REGISTRY')]) {
                docker.withRegistry("${DOCKER_REGISTRY}", 'nexus-credentials') {
                  def dockerImage = docker.build("admin:${env.BUILD_ID}", '--progress=plain -f apps/server/admin/Dockerfile .')
                  dockerImage.push()
                }
              }
            }
          }
        )
      }
    }

    stage('Terraform Init') {
      steps {
        script {
            sh "terraform -chdir=apps/server/TF init"
        }
      }
    }

    stage('Terraform Apply') {
      steps {
        script {
          withCredentials([
            string(credentialsId: 'nexus-url', variable: 'DOCKER_REGISTRY'),
            usernamePassword(credentialsId: 'nexus-credentials', usernameVariable: 'DOCKER_REGISTRY_USERNAME', passwordVariable: 'DOCKER_REGISTRY_PASSWORD'),
            string(credentialsId: 'docker-host', variable: 'DOCKER_HOST'),
            usernamePassword(credentialsId: 'proxy-credentials', usernameVariable: 'PROXY_USERNAME', passwordVariable: 'PROXY_PASSWORD')
            ]
          ) {
                sh """
                  terraform -chdir=apps/server/TF apply \
                  -var='build_id=${env.BUILD_ID}' \
                  -var='docker_registry=${DOCKER_REGISTRY}' \
                  -var='docker_registry_username=${DOCKER_REGISTRY_USERNAME}' \
                  -var='docker_registry_password=${DOCKER_REGISTRY_PASSWORD}' \
                  -var='docker_host=${DOCKER_HOST}' \
                  -var='proxy_username=${PROXY_USERNAME}' \
                  -var='proxy_password=${PROXY_PASSWORD}' \
                  -auto-approve
                """
          }
        }
      }
    }
  }
}