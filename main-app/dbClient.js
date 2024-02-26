const { MongoClient, ServerApiVersion } = require('mongodb')

const dbClient = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ru2s1x9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
,`, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
}
)

module.exports = dbClient



