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


const saveProduct = async (productObj) => {
  // console.dir(productObj)
  const productCollection = getProductCollection()
  const filter = { id: productObj.value.id }
  const options = { upsert: true };
  const updateDoc = {
    $set: productObj.value,
  };
  try {
    const result = await productCollection.updateOne(filter, updateDoc, options);
  } catch (error) {
    console.log(error);

  } finally {
  }
}

const taskCallback = async () => {
  const options = {
    port: 3001,
    protocol: "http:",
    host: "localhost",
    method: "GET",
  };

  const request = http.request(options, (response) => {
    const startTime = new Date().getTime()
    console.log('Task Started')
    response
      .pipe(parser())
      .pipe(Pick.pick({ filter: 'content.products' }))
      .pipe(StreamArray.streamArray())
      .on('data', saveProduct)
      .on('error', (error) => console.log(error))
      .on('end', async () => {
        const productsCollection = getProductCollection()
        const count = await productsCollection.countDocuments()
        console.log(`DB contain ${count} products!`)
        const endTime = new Date().getTime()
        console.log(`Task finished and took ${(endTime - startTime) / 1000}s`)
      })
  })

  request.end();
};



// const task = cron.schedule("10 * * * * *", taskCallback);

module.exports = {
  // task,
  taskCallback,
};
