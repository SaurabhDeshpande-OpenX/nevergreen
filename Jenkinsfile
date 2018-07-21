pipeline {
  agent none
  stages {
    stage('Stage1') {
      parallel {
        stage('Stage1') {
          agent any
          steps {
            sh 'sleep 10'
          }
        }
        stage('Stage2') {
          agent any
          steps {
            sh 'sleep 20'
          }
        }
      }
    }
  }
}
