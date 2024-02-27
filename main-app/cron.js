const cron = require("node-cron");
const dbClient = require("./dbClient");
const http = require("node:http");
const Pick = require("stream-json/filters/Pick")
const { parser } = require("stream-json");
const StreamArray = require("stream-json/streamers/StreamArray");


const getProductCollection = () => {
  const db = dbClient.db('some_db')
  const productCollection = db.collection('products')
  return productCollection
}


const saveProduct = (productObj) => {
  console.dir(productObj)
  /** DO DB staff with each separeted product 

  
  const productCollection = getProductCollection()
  productCollection.insertOne(productObj)
  */
}

const taskCallback = async () => {
  const options = {
    port: 3001,
    protocol: "http:",
    host: "localhost",
    method: "GET",
  };

  const request = http.request(options, (response) => {
    response
      .pipe(parser())
      .pipe(Pick.pick({ filter: 'content.products' }))
      .pipe(StreamArray.streamArray())
      .on('data', saveProduct)
      .on('error', (error) => console.log(error))
  })

  request.end();
};



const task = cron.schedule("10 * * * * *", taskCallback);

module.exports = {
  task,
  taskCallback,
};
