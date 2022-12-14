FROM node:18-alpine
RUN apk install xdg-utils --fix-missing
# Install dependencies
COPY package.json yarn.lock ./
RUN npm install --frozen-lockfile

# Copy source code

WORKDIR /app


COPY . .