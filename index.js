'use strict';

var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./app/auth'));

require('./app/actions')(app);

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log('Listening on ' + port);
});
