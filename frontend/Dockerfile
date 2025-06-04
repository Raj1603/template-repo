FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Set environment variables for hot reloading
ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true

# Expose port
EXPOSE 3000

# Command to run the application with hot reloading
CMD ["npm", "run", "dev"] 