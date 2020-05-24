FROM node:11
WORKDIR /home/ec2-user/project
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD [ "npm","start" ]

