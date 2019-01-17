# cogri-vocabulary

- *Project Link:* [https://cogri-vocabulary.tranhuuquang.me](https://cogri-vocabulary.tranhuuquang.me)
- *Github Link:* [cogri-vocabulary](https://github.com/kieronqtran/cogri-vocabulary)

The system is built with Angular as front-end and Node.js as Back-end

## Development Time:
Liter11ally, Days and Nights (without sleep).

## User management: 
The user management is using fully Cognito with using the custom domain https://auth.tranhuuquang.me/ with OAuth2. User could create a new account or Using their Google Account. The auth server will return JWT token and server using Passport-jwt to it.

## All Services:
- *Word Service:* 
+ The word CRUD could accessed on page [Word CURD](https://cogri-vocabulary.tranhuuquang.me/admin/word). Only Admin can accessed to this group.
+ This service also listens to a queue provided by AWS SQS. Whenever it detects a message in this queue, it is going to receive that message and extract the information from this message, based on which, a new word is added into the database (the content of each message is mentioned in the Web Crawler below). 

- *Web Crawler:*
+ This web crawler receives a text list of words and automatically go to the following 3 websites to get data for each word. 
https://dictionary.cambridge.org/dictionary/english-vietnamese
http://www.synonym-finder.com
https://translate.google.com
+ The result is then pushed to the AWS SQS queue mentioned above (in the Word Service) to be added into the database.
+ Currently, the database has around 10 thousand words.

- *Learn Service:* 
+ Users can go to [Learn Page](https://cogri-vocabulary.tranhuuquang.me/learn) for Learning words.
+ Users can choose between 2 learning options: Random and Sequence. For Random, 5 random words that users have NOT learned will be fetched from the database. For Sequence, the words are fetched alphabetically. The words are fetched by calling a GET request to the Word Service.
+ For every word, users have to complete 2 quizzes before getting to the next one. When users answer the quizzes correctly, a new record of their learning is added into the database. This includes their learning time and also the time it took them to do the quiz.

- *Worker Service:*
+ This service is application of AWS Machine Learning into creating an Email Service.
+ Every week, users will receive an encouraging email predicting the number of new words that they are capable of learning in the following week.
+ The data used for training the machine learning model is based on users' learning records (mentioned in the Learn Service above). 

- *Client Service (the Front-end):*
+ The front-end was built using Angular and Redux.


- Application using Beanstalk Multicontainer Docker environment. MySql on RDS for storing persistence relational data. Redis in ElasticCache is using for HTTP request Caching, Database Query Caching, Messaging for sending bulk emails, and CRON jobs.
- The website already integrates HTTPS SSL by using Certificate Manager

All the services that has been used:
 - AWS Beanstalk
 - AWS RDS
 - AWS Certificate Manager
 - AWS Elastic Cache
 - AWS Cognito
 - AWS Route 53
 - AWS Simple Queue Service
 - AWS Lambda
 - Headless chromium
 - Docker Hub
 - Github
 - *Coffee at Kai Coffeeshop*
 

## Accounts:
- Admin: *UserName:* kieron.qtran@gmail.com - *Password* VuSAi4zRmO7%@@Zt%!e0YW
- User: *UserName:* kieron2208@gmail.com - *Password* 6*SXINQvh1#SBc5Be5#IH& or register an account

## Tech Stack
### Required Tools
* [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [eb cli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
* [npm](https://www.npmjs.com/)
* [angular-cli](https://github.com/angular/angular-cli)

### Frameworks
* [AWS JavaScript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-intro.html)
* [Angular 2](https://angular.io/docs/ts/latest/quickstart.html)
* [Angular Material](https://material.angular.io/)
* [TypeScript](https://www.typescriptlang.org/docs/tutorial.html)
* [Bootstrap](http://getbootstrap.com/)

## AWS Setup
##### Install the required tools
* Create an AWS account
* Install [npm](https://www.npmjs.com/)
* [Install or update your aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [Install or update your eb cli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
* [Install angular-cli](https://github.com/angular/angular-cli)

## Run application locally
```
# Install the NPM packages
npm install
```
```
# Run the app in dev mode
cd client && npm start
docker-compose -f Development.docker-compose.yml up wordapp
docker-compose -f Development.docker-compose.yml up learnerapp
docker-compose -f Development.docker-compose.yml up workerapp
cd web-crawler && node run.js
```
Application is running on default url http://localhost:4200

### _Beanstalk:_ Update, Build and Deploy

_NOTE: This set-up deployment required to set up 2 docker repositories ( one for front-end and one for backend ). Suggested using [AWS ECR](https://aws.amazon.com/ecr/) or [Docker Hub](https://hub.docker.com/). If there are repositories, replace the image tag in *Production.docker-compose.yml*_

```
# Commit your changes in order to deploy it to your environment
git add .
git commit
docker-compose -f Production.docker-compose.yml build
docker-compose -f Production.docker-compose.yml push
eb deploy
```
```
# View your deployed application in a browser
eb open
```

