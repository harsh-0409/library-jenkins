pipeline {
    agent any

    stages {
        stage('Build Library Frontend') {
            steps {
                dir('LIBRARY-MANAGEMENT/LIBAPI-REACT') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy Library Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryreact" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryreact"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryreact"
                xcopy /E /I /Y LIBRARY-MANAGEMENT\\LIBAPI-REACT\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryreact"
                '''
            }
        }

        stage('Build Library Backend') {
            steps {
                dir('LIBRARY-MANAGEMENT/LIBAPI-SPRINGBOOT') {
                    bat 'mvn clean package'
                }
            }
        }

        stage('Deploy Library Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryspring.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryspring.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryspring" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\libraryspring"
                )
                copy "LIBRARY-MANAGEMENT\\LIBAPI-SPRINGBOOT\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
                '''
            }
        }
    }

    post {
        success { echo 'Library Deployment Successful!' }
        failure { echo 'Library Pipeline Failed.' }
    }
}
