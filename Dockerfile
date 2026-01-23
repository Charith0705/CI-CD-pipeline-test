# 1️⃣ Base image
FROM node:18-alpine

# 2️⃣ Set working directory inside container
WORKDIR /app

# 3️⃣ Copy package files first (layer caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy application code
COPY . .

# 6️⃣ Expose app port
EXPOSE 3000

# 7️⃣ Start the app
CMD ["npm", "start"]
