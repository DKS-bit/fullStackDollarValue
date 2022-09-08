FROM node:18
WORKDIR /clientpage
ENV PATH ="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]