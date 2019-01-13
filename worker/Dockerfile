FROM node:dubnium-alpine as npm_builder
# Set the entrypoint as bin bash incase we want to inspect the container
ENTRYPOINT ["/bin/bash"]
# Manually copy the package.json
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app
# Install all of our dependencies
RUN npm install

FROM npm_builder as builder
# Copy the app excluding everything in the .dockerignore
COPY . /usr/src/app
# Put node_modules into the path, this will purely be used for accessing the angular cli
ENV PATH /usr/src/app/node_modules/.bin:$PATH
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app
# Build our distributable
RUN npm run build:prod

FROM node:dubnium-alpine as production

ENV NODE_ENV production

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn

# Manually copy the package.json
COPY ./package.json /usr/src/app/package.json
COPY ./package-lock.json /usr/src/app/package-lock.json
# Set the work directory to where we copied our source files
WORKDIR /usr/src/app

# RUN npm install
# If you are building your code for production
RUN npm install --production && mkdir -p /usr/app/dist

COPY ecosystem.config.js .

# Bundle app source
COPY --from=builder /usr/src/app/dist /usr/src/app/dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
