var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static(path.join(__dirname,'./client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
app.listen(8899,function () {
  console.log('listening 8899, orders and customers')
});
