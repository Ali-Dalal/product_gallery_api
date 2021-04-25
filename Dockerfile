FROM node:14.16.1-alpine3.13 AS Builder
WORKDIR /build
COPY . .
RUN ["npm","i","-g","typescript"]
RUN ["npm","i"]
RUN ["npm","run","build"]
RUN ["npm", "prune", "--production"]

FROM node:14.16.1-alpine3.13
WORKDIR /srv/www/web_api
COPY --from=Builder /build/build .
COPY --from=Builder /build/node_modules node_modules
RUN ["npm", "i", "-g", "pm2"]
EXPOSE 3000
CMD ["pm2-runtime", "index.js"]