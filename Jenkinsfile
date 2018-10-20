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
            currentBuild.result = 'SUCCESS'
            echo "RESULT: ${currentBuild.result}"
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
void whateverFunction() {
    sh 'ls /'
}
