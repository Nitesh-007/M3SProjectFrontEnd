//library call

@Library('shared_ci_library') _

pipeline {

    //created a slave node

    agent { label "avinash_test" }  
    
    parameters {
        choice choices: ['dev', 'qa'], description: 'Choose an env', name: 'Env'
    }

    //setting the env variables.

    environment{
        mail_to = "avinash.svvdntech.in"
        cc_to = "avinash.s@vvdntech.in"
        BUILD_USER=getBuildUser()
        GIT=gitCommitURL()
        ARTIFACTORY_PATH = "null"
        ARTIFACTORY_BINARY = "null"
        JFROG_REPO_NAME = "VVDN_MMMS"
        PROJECT_NAME= "VVDN_MMMS"
        GOOGLE_CHAT_ROOM_ID = "fmgs_gchat"
    }
    
    stages{
      stage('Pre build Notification'){
        steps{
            script{ 
               //emailNotification('STARTED',"${mail_to}","${cc_to}","${BUILD_USER}")
               googlechatlib('STARTED',"${BUILD_USER}","${GOOGLE_CHAT_ROOM_ID}")
            
               }
            }    
        }
    stage("Docker-Build"){
        steps{
            script{
                  withCredentials([string(credentialsId: 'VVDN_MMMS_Slave', variable: 'pwd')]) {
               
                    sh """
                        echo ${pwd} | sudo -S docker build -t vvdn_mmms_fe:v0 .
                       """
                }
            }
        }
    }
      stage("Deployment")
      {
          steps{
              script{
                  withCredentials([string(credentialsId: 'VVDN_MMMS_Slave', variable: 'pwd')]) {
                    if ("${params.Env}"=="dev"){
                        sh """
                        echo ${pwd} | sudo -S docker rm -f Frontend_${params.Env}
                        echo ${pwd} | sudo -S docker run --restart=always -dt -p 4200:4200 --name Frontend_${params.Env} vvdn_mmms_fe:v0
                        """
                    }
                    if ("${params.Env}"=="qa"){
                        sh """
                        echo ${pwd} | sudo -S docker rm -f Frontend_${params.Env}
                        echo ${pwd} | sudo -S docker run --restart=always -dt -p 4210:4200 --name Frontend_${params.Env} vvdn_mmms_fe:v0
                        """
                    }
                  }
              }
          }
      }
    }
    
    post
      {
        always 
          {
            script
              {
               
               //emailNotification(currentBuild.result,"${mail_to}","${cc_to}","${BUILD_USER}") 
               //badge("${BUILD_USER}") 
               googlechatlib(currentBuild.result,"${BUILD_USER}","${GOOGLE_CHAT_ROOM_ID}")
              }
          }
       }
 }
