FROM node:10.16-alpine

# Create App Directory
RUN mkdir -p /usr/src/schoolapp

# Change the working directory
WORKDIR /usr/src/schoolapp

# Copy package.json 
COPY package*.json ./

# Install all exact version 
# dependencies from the package-lock
RUN npm ci

# Copy app source code
COPY . .

# Exports
EXPOSE 8080

# Executed this command 
# when the Docker container start
CMD ["npm","start"]