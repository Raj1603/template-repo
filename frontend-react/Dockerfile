FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables
ENV NODE_ENV=development
ENV DISABLE_ESLINT_PLUGIN=true
ENV REACT_APP_API_URL=http://localhost:8000

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"] 