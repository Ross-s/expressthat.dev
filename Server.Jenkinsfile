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
            usernamePassword(credentialsId: 'proxy-credentials', usernameVariable: 'PROXY_USERNAME', passwordVariable: 'PROXY_PASSWORD'),
            usernamePassword(credentialsId: 'expressthat-cognito', usernameVariable: 'COGNITO_CLIENT_ID', passwordVariable: 'COGNITO_CLIENT_SECRET'),
            string(credentialsId: 'expressthat-auth-secret', variable: 'AUTH_SECRET'),
            string(credentialsId: 'expressthat-cognito-issuer', variable: 'COGNITO_ISSUER'),
            string(credentialsId: 'expressthat-database-url', variable: 'DATABASE_URL'),
            string(credentialsId: 'expressthat-redis-ip', variable: 'REDIS_IP'),
            usernamePassword(credentialsId: 'server_postgres', usernameVariable: 'POSTGRES_USERNAME', passwordVariable: 'POSTGRES_PASSWORD')
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
                  -var='server_cognito_client_id=${COGNITO_CLIENT_ID}' \
                  -var='server_cognito_client_secret=${COGNITO_CLIENT_SECRET}' \
                  -var='server_auth_secret=${AUTH_SECRET}' \
                  -var='server_cognito_issuer=${COGNITO_ISSUER}' \
                  -var='server_database_url=${DATABASE_URL}' \
                  -var='server_redis_ip=${REDIS_IP}' \
                  -var='server_postgres_user=${POSTGRES_USERNAME}' \
                  -var='server_postgres_password=${POSTGRES_PASSWORD}' \
                  -auto-approve
                """
          }
        }
      }
    }
  }
}