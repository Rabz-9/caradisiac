const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');


async function getBrand(){
  const brands = await getBrands();
  console.log(brands);
  return brands;
}

// var allcaradisiac ={};
async function getModel(string){
  const models = await getModels(string);
  console.log(models);
}

let brands = getBrand();

brands.then(function(result){
  // console.log(result);
  for (var i = 0; i < result.length; i++) {
    details = getModel(result[i]);
  }
});
// brand.then(function(result){
//   for(var i = 0 ; i < result.length ; i++)
//   {
//     description = getModel(result[i]);
//   }
// })
// var elasticsearch = require('elasticsearch');
// var client = new elasticsearch.Client({
//   host: 'localhost:9200',
//   log: 'trace'
// });
// client.ping({
//   // ping usually has a 3000ms timeout
//   requestTimeout: 1000
// }, function(error) {
//   if (error) {
//     console.trace('elasticsearch cluster is down!');
//   } else {
//     console.log('All is well');
//   }
// });

// var body = [];
// for (var i = 0; i < stocks.length; i++ ) {
//     delete stocks[i]._id;
//     var config = { index:  { _index: 'stocks', _type: 'stock', _id: i } };
//     body.push(config);
//     body.push(stocks[i]);
// }
//
// client.bulk({
//     body: body
// }, function (error, response) {
//     if (error) {
//         console.error(error);
//         return;
//     }
//     else {
//         console.log(response);  //  I don't recommend this but I like having my console flooded with stuff.  It looks cool.  Like I'm compiling a kernel really fast.
//     }
// });
