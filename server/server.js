const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// start express app!
const app = express();

// root route handler
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// listen for requests
app.listen(3000, () => {
  console.log('server is listening on port 3000');
});

