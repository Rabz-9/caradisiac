const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();


const port = 9292;
require('./app/routes')(app);
app.listen(port, () => {
  console.log('We are live on ' + port);
});
