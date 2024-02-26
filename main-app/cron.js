const cron = require('node-cron')
const dbClient = require('./dbClient')
const task = cron.schedule('10 * * * * * ', () => console.log('stared'))
module.exports = task
