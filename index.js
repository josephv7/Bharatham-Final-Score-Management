const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Request = require("request");
const axios = require('axios');
const cors = require('cors');
var admin = require('firebase-admin');

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
  res.send('coming soon');
});


let server = app.listen(3000, function() {
    console.log('Server is listening on port 3000')
});
