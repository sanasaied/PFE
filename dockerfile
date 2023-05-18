FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port on which the frontend will run
EXPOSE 3001

# Build the frontend app

RUN npm run build

# Serve the built app with a static server
CMD [ "npm", "run", "serve" ]
