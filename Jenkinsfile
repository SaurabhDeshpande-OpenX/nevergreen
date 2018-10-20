pipeline {
  agent none
  stages {
    stage('Stage1') {
      parallel {
        stage('Stage1') {
          agent any
          steps {
            sh 'sleep 2'
          }
        }
        stage('Stage2') {
          agent any
          steps {
            sh 'sleep 3'
          }
        }
      }
    }
  }
}
