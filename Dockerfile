# Use the same supported Node.js release in every deployment environment
FROM node:20-slim

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app source
COPY . .

# Create uploads directory
RUN mkdir -p public/uploads

# Compile the browser bundle from the deployed source.
RUN npm run build

# Expose port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
