# cogri-vocabulary

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

