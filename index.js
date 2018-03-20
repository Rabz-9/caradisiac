const {getBrands} = require('node-car-api');
const {getModels} = require('node-car-api');
var elasticsearch = require('elasticsearch');
var fs = require('fs');

//Get all the Brands from Caradisiac Website
async function getBrand(){
  const brands = await getBrands();
  console.log(brands);
  return brands;
}

//For all brands, pick all the Model;
async function getModel(string){
  const models = await getModels(string);
  console.log(models);
  return models;
}


//Call the function that pick all the Brands & store all the Brands in a variable
let brands = getBrand();

//Promise, that for each brand we're going to find all the model and information about the model
brands.then(function(result){
  for (var i = 0; i < result.length; i++) {
    details = getModel(result[i]);
    details.then(function(result){
      result.forEach(function(res){
        final_result = JSON.stringify(res);
        console.log("On affiche le premier element " + res['uuid']);
        fs.appendFileSync("./SUVInformation.json",  final_result + "\r\n", null, 'utf8', (err) => {});
      })
    })
  }
});
