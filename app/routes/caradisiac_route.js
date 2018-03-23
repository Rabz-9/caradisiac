var elasticsearch = require('elasticsearch');
var fs = require('fs');
var data = fs.readFileSync("./SUVInformation.json", "utf8");
var cars = data.split("\n");
var car_content = [];
for (var i = 0; i < cars.length - 1; i++) {
  car_content[i] = JSON.parse(cars[i]);
  car_content[i].volume = parseInt(car_content[i].volume);
}

//ElasticSearch Connection
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

//Ping to check the connection
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function(error) {
  if (error) {
    console.trace('Elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

//When calling the route /suv, we list all the cars ordering by volume DESC
module.exports = function(app) {
  app.get("/suv", (req, res) => {
    client.search({
      index: 'caradisiac',
      type: 'car',
      sort : 'volume:desc',
      size: 300
    }).then(function(body) {
      var hits = body.hits.hits;
      //We send the results of the query
      res.send(hits);
      console.log(hits);
    }, function(error) {
      console.trace(error.message);
    });
  });

//When caling the route /populate, we index the data into ElasticSearch
  app.post("/populate", (req, res) => {
    for (var i = 0; i < car_content.length -1 ; i++) {
      console.log("On entre ici");
      var id = car_content[i].uuid;
      var testdata = car_content[i];
      client.create({
        index: 'caradisiac',
        type: 'car',
        id: id,
        body: testdata
      }, function(error, response) {
        console.log(error);
        // ...
      });
    }
    //When the insertion is done, we print a message to notify that the insertion is finished
    res.send("Succesfull");
  });
}
