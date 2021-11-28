# notification-system
Notification system for sending Notifications (SMS/Email/Push Notification) to specifec user or group of users.

technologies:
  - node js
  - express
  - mongodb
  - redis
  - kafka
  - jest
  - docker
  - docker-compose
  - slack APIs

to start this project :
  - approach 1:
    - prerequisites:
      - install node     https://nodejs.org/en/download/
      - install mongo    https://docs.mongodb.com/manual/administration/install-community/
      - install redis    https://redis.io/download
      
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
      

Steps to Send a notification:
  - for specific user:
    - create user: http://localhost:7000/api-docs/#/User/createUser
    - create notification: http://localhost:7000/api-docs/#/Notification/createNotification  
  
  - for group of users:
    - create user: http://localhost:7000/api-docs/#/User/createUser
    - create group: http://localhost:7000/api-docs/#/User/createGroup
    - add users to group: http://localhost:7000/api-docs/#/User/addUsersToGroup
    - create notification: http://localhost:7000/api-docs/#/Notification/createNotification

DB SCHEMA
  ![DB SCHEMA](https://user-images.githubusercontent.com/11231159/127750784-687e2e55-0a1e-4139-8c4d-4b6d065d8dce.png)

