const brewerieLastId = require("../DB/open-beer-database.json");

let idBrewery;
let idItems;
let myArray = [];
let idArray = [];
let y = 0;
for (let i in brewerieLastId) {
    let myNumber = parseInt(brewerieLastId[i].fields.brewery_id);
    let idNUmber = parseInt(brewerieLastId[i].fields._id)
    idArray[i] = idNUmber;
    if (!myArray.includes(myNumber)) {
        myArray[y] = myNumber;
        y++;
    };
};

myArray.sort(function (a, b) { return a - b });
module.exports.idBrewery = myArray[myArray.length - 1];
module.exports.idItems = idArray.length - 1;