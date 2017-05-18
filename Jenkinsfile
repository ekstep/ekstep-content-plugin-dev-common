pipeline {
    agent {
        label 'plugin-build'
    }
    triggers {
        pollSCM 'H/5 * * * *'
    }
    tools {
        nodejs 'NodeJS 7.9.0'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
    post {
        success{
            slackSend(color: 'good', message: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
        failure {
            slackSend(color: 'danger', message: "FAILURE: ${env.JOB_NAME} #${env.BUILD_NUMBER} (<${env.BUILD_URL}|Open>)")
        }
    }
}