FROM node:alpine
# make the 'app' folder the current working directory
RUN mkdir -p /usr/src/app/front
WORKDIR /usr/src/app/front
# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /usr/src/app/front/

# install project dependencies
RUN npm install
ENV HOST=0.0.0.0

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . /usr/src/app/front

EXPOSE 8080
