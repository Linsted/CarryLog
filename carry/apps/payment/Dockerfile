#1st stage

FROM node:slim AS development

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig*.json ./

RUN npm install -g nx
RUN npm install

# Bundle app source
COPY . .

RUN nx build payment --skip-nx-cache

#2nd stage
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=development /usr/src/app/dist ./dist

RUN npm install --production

CMD ["node", "dist/apps/payment/main.js"]