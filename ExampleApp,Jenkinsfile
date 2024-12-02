pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                parallel(
                    'docs': {
                        script {
                            def dockerImage = docker.build("docs:${env.BUILD_ID}", '--progress=plain -f apps/docs/Dockerfile .')
                        }
                    },
                    'web': {
                        script {
                            def dockerImage = docker.build("web:${env.BUILD_ID}", '--progress=plain -f apps/web/Dockerfile .')
                        }
                    }
                )
            }
        }
    }
}
