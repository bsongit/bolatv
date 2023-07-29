const cors = require('cors')
const allowedOrigins = require('./index').get('server.allow-origin')

const init = app => {
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200
  })

  app.use(cors())
}

module.exports = {
  init
}
