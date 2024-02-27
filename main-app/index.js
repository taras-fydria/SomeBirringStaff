const express = require('express')
const dotenv = require('dotenv').config()
const dbClient = require('./dbClient')
const task = require('./cron')
const router = require('./router')



async function start() {
  const app = express()
  const PORT = process.env.PORT || 3000
  //task.start()
  task.taskCallback()
  await dbClient.connect()
  app.use(express.json())
  app.use(router)

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
}

start()
