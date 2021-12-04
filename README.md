# Notification-System
Notification System For Sending Notifications (SMS/Email/Push_Notification) To Specifec User Or Group Of Users.
By follwing Clean Architecture Using(Node.js) to write resilient software By implimenting Solid Prenciple And The Fit Design Pattern .

technologies:
  - Node js
  - Express
  - Mongodb
  - Rdis
  - Apache Kafka
  - Docker
  - Docker-compose
  - Slack Hooks APIs
  - Jest Unit Testing

Solid Prenciple:
  - Open-Closed Prenciple
  - Dependency Inversion Prenciple

Design Pattern:
- Factory Design Pattern

To Start This Project :
  - approach 1:
    - prerequisites:
      - install node     https://nodejs.org/en/download/
      - install mongo    https://docs.mongodb.com/manual/administration/install-community/
      
    - to run this project:
      - clone this repo
      - run: 'yarn'
      - run: yarn build  "you need typescript installed globally to run this command"
      - run: yarn start
      - optional: for unit testing run: yarn test

  - approach 2:
    - prerequisites:
      - install docker     
      - install docker-compose    
    
    - to run this project:
      - clone this repo
      - run docker-compose build
      - run docker-compose up
      
      - make sure zookeeper-server should be running on port 2181
      - make sure kafka-server1 should be running on port 9092

Steps to Send a notification:
  - for specific user:
    - POST: create user: http://localhost:7000/v1/user
    - POST: create notification: http://localhost:7000/v1/notification
  
  - for group of users:
    - POST: create user: http://localhost:7000/v1/user
    - POST: create group: http://localhost:7000/v1/group
    - POST: add users to group: http://localhost:7000/v1/user-group
    - POST: create notification: http://localhost:7000/v1/notification
    - GET: get all notification: http://localhost:7000/v1/notification

