const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const Request = require("request");
const axios = require('axios');
const cors = require('cors');
var admin = require('firebase-admin');

var serviceAccount = require("./firebase_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bharatham2020-5015e.firebaseio.com"
});

let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/update', function(req, res) {

  var house = req.query.house;
  console.log(house);
  var from = req.query.from;
  console.log(from);

  var db = admin.database();
  var fromRef = db.ref(from);
  var toRef = db.ref('Testscore')

  fromRef.once("value",function(snapshot){
    
    newValue = snapshot.child('House').child(house).val();
    console.log(newValue);

    toRef.child('House').child(house).set(newValue);


  });

  res.send('coming soon');
});


app.get('/copy', function(req,res){


  

  var fromRef = req.query.from;
  console.log(fromRef);
  var toRef = req.query.to;
  console.log(toRef);


  var db = admin.database();
  var fromRef = db.ref(fromRef);
  var toRef = db.ref(toRef)



  fromRef.once("value", function(snapshot){

    toRef.set(snapshot.val(), function(error){

      if(error){
        console.log('Copying Error!');
      }else{
        console.log('Copying Success!');
      }

    });

  });


});


let server = app.listen(3000, function() {
    console.log('Server is listening on port 3000')
});
