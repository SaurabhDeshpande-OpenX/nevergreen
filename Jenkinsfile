pipeline {
  agent none
  stages {
    stage('Stage1') {
      parallel {
        stage('Stage1') {
          agent any
          steps {
            sh 'sleep 2'
            whateverFunction()
          }
        }
        stage('Stage2') {
          agent any
          steps {
            sh 'sleep 3'
            echo 'buildNo'
            BUILD_NUMBER
          }
        }
      }
    }
  }
}
void whateverFunction() {
    sh 'ls /'
    BUILD_NUMBER
}
