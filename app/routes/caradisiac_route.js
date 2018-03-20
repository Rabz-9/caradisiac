var elasticsearch = require('elasticsearch');
var fs = require('fs');
var data = fs.readFileSync("./SUVInformation.json", "utf8");
var cars = data.split("\n");
var car_content = [];
for (var i = 0; i < cars.length - 1; i++) {
  car_content[i] = JSON.parse(cars[i]);
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

module.exports = function(app) {
  app.get("/test", (req, res) => {
    client.search({
      index: 'carstestbisbis',
      type: 'typecarbisbis',
      size: 200
    }).then(function(body) {
      var hits = body.hits.hits;
      res.send(hits);
      console.log(hits);
    }, function(error) {
      console.trace(error.message);
    });
  });

  app.post("/testPush", (req, res) => {
    for (var i = 20; i < 50; i++) {
      console.log("On entre ici");
      var id = car_content[i].uuid;
      var testdata = car_content[i];
      client.create({
        index: 'carstestbisbis',
        type: 'typecarbisbis',
        id: id,
        body: testdata
      }, function(error, response) {
        console.log(error);
        // ...
      });
    }
    res.send("Succesfull");
  });
}
