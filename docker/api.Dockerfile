# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY packages/marketplace-graphql-api/ /app

COPY packages/graphql-common /tmp/graphql-common

RUN cd /tmp/graphql-common && npm i && npm run build

# Install dependencies
RUN cd /app && rm package-lock.json yarn.lock && \
    cp /tmp/graphql-common /app/commons -Rf && \
    cp /tmp/graphql-common/package.json /app/commons/ && \
    npm install /app/commons/ && npm i tsx

# # Expose the port that the application will run on
EXPOSE 9001

# # Start the application
CMD ["npm", "run", "start:direct"]