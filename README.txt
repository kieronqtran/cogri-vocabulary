# cogri-vocabulary

- *Project Link:* [https://cogri-vocabulary.tranhuuquang.me](https://cogri-vocabulary.tranhuuquang.me)
- *Github Link:* [cogri-vocabulary](https://github.com/kieronqtran/cogri-vocabulary)

The system is built with Angular as front-end and Node.js as Back-end

## Built functionalities

- *Word CRUD:* The word CRUD could accessed on page [Word CURD](https://cogri-vocabulary.tranhuuquang.me/admin/word). Only Admin can accessed to this group.
- *User management:* The user management is using fully Cognito with using the custom domain https://auth.tranhuuquang.me/ with OAuth2. User could create a new account or Using their Google Account. The auth server will return JWT token and server using Passport-jwt to it.
- *Learn feature:* user can go to [Learn Page](https://cogri-vocabulary.tranhuuquang.me/learn) for Learning a 10 random words.
- Application using Beanstalk Multicontainer Docker environment. MySql on RDS for storing persistence relational data. Redis in ElasticCache is using for HTTP request Caching, Database Query Caching, Messaging for sending bulk emails, and CRON jobs.
- The website is already integrate HTTPS SSL by using Certificate Manager

All the cloud services that has been used:
 - AWS Beanstalk
 - AWS RDS
 - AWS Certificate Manager
 - AWS Elastic Cache
 - AWS Cognito
 - AWS Route 53
 - Docker Hub
 - Github
 - Circle CI

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
cd server && npm start
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

