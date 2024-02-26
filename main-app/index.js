const express = require('express')
const dotenv = require('dotenv').config()
const dbClient = require('./dbClient')
const task = require('./cron')

async function start() {
  const app = express()
  const PORT = process.env.PORT || 3000
  task.start()
  await dbClient.connect()
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()


