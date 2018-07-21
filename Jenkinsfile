pipeline {
  agent any
  stages {
    stage('Stage1') {
      parallel {
        stage('Stage1') {
          steps {
            sh 'sleep 10'
          }
        }
        stage('Stage2') {
          steps {
            sh 'sleep 20'
          }
        }
      }
    }
  }
}