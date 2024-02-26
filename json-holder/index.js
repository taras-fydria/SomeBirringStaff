const http = require('node:http')
const fs = require('node:fs');
const path = require('node:path');

const server = http.createServer((_, response) => {
  const readStreem = fs.createReadStream(
    path.resolve(__dirname, "some_data.json")
  );
  readStreem.on("data", (chunk) => {
    console.log(chunk.toString())
    response.write(chunk)
  });
  response.end()
});

server.listen(3001);
