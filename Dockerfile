FROM node:16

WORKDIR /app

RUN npm install

COPY . .

RUN npm install --production
RUN npm run build

ENV NODE_ENV=production

# Expose the port that the Next.js application will listen on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]