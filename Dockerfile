FROM node:23.10.0

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application 
COPY . .

RUN --mount=type=secret,id=envfile \
    bash -c "export $(grep -v '^#' /run/secrets/envfile | xargs) && npm run build"

# Start the application
CMD ["npm", "start"]
