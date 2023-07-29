const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const database = require('./src/config/db.js');
const cors = require('./src/config/cors');

// SERVER INSTANCE
const app = express();
var server = require('http').createServer(app);

// enable files upload
app.use(fileUpload({
  createParentPath: true,
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
  }
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('uploads'));


// CORS
cors.init(app);

// DATABASE
database.connect();

// ROUTES
app.use('/api', require('./src/routes'));

// SERVER INITIALIZATION
const PORT = process.env.PORT || require('./src/config').get('server.port');

server.listen(PORT, () => {
  console.log(`port : ${PORT} : ${server}`)
});