# Use the official Node.js 18 image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY packages/marketplace-graphql-api/ /app

RUN cd /app && npm i tsx

# # Expose the port that the application will run on
EXPOSE 9001

# # Start the application
CMD ["npm", "run", "start:direct"]