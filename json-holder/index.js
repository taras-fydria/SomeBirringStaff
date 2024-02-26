const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const server = http.createServer((_, response) => {
  const readStreem = fs.createReadStream(
    path.resolve(__dirname, "some_data.json"),
  );
  const data = [];
  response.setHeader("Content-Type", "application-json");
  readStreem
    .on("data", (chunk) => {
      response.write(chunk.toString());
    })
    .on("end", () => {
      response.end();
    });
});

server.listen(3001);
