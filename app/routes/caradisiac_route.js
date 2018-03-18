var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
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
      index: 'myindex',
      type: 'mytype',
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
    client.create({
      index: 'myindex',
      type: 'mytype',
      id: '1',
      body: {
        title: 'Test 1',
        tags: ['y', 'z'],
        published: true,
        published_at: '2013-01-01',
        counter: 1
      }
    }, function(error, response) {
      // ...
    });
  });
}
