#!/usr/bin/env groovy
pipeline {
  agent none
  stages {
    stage('Stage1') {
      parallel {
        stage('Stage1') {
          agent any
          when {
               expression{ triggerBuild() }
          }
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
        stage('Stage3') {
          agent any
          when {
               expression{ oncePerDaybuildTriggered() }
          }
          steps {
            sh 'sleep 3'
            sh 'env | sort'
          }
        }
      }
    }
  }
}
def whateverFunction() {
    sh 'ls /'
    currentBuild.result = 'SUCCESS'
    echo "RESULT: ${currentBuild.result}"
  if (currentBuild.result == 'SUCCESS'){
    echo "Gradual Success"
    return false
  }
}
def triggerBuild(){
    echo "BUILD No: ${currentBuild.number}"
  if (currentBuild.number % 2){
    echo "trigger Success"
    return true
  }
  else{
    echo "trigger Failure"
    return false
  }
}
def oncePerDaybuildTriggered(){
  def now = new Date()
  println now.format("yyMMdd.HHmm", TimeZone.getTimeZone('UTC'))
  currentHour = 10
  if (currentHour == 10){
    echo "trigger Success"
    return true
  }
  else{
    echo "trigger Failure"
    return false
  }
}
