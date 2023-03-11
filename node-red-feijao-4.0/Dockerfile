FROM nodered/node-red:latest
COPY flows.json .
ENV FLOWS=flows.json
RUN npm i node-red-node-mysql
EXPOSE 1880