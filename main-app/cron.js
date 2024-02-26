const cron = require("node-cron");
const dbClient = require("./dbClient");
const http = require("node:http");
const JSONStream = require("JSONStream");

const taskCallback = async () => {
  const options = {
    port: 3001,
    protocol: "http:",
    host: "localhost",
    method: "GET",
  };

  const request = http
    .request(options, (response) => {
      response
        .pipe(JSONStream.parse('content.products') )
        .on("data", (chunk) => {
          response.setEncoding("utf8");
          console.log(chunk);
        })
        .on("end", () => console.log("ended"))
        .on("close", () => console.log("closed"));
    })
    .end();
};

const task = cron.schedule("10 * * * * *", taskCallback);

module.exports = {
  task,
  taskCallback,
};
