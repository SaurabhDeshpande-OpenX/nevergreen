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
            sh 'env | sort'
          }
        }
      }
    }
  }
}
boolean whateverFunction() {
    sh 'ls /'
    currentBuild.result = 'SUCCESS'
    echo "RESULT: ${currentBuild.result}"
  if (currentBuild.result == 'SUCCESS'){
    echo "Gradual Success"
    return true
  }
}
