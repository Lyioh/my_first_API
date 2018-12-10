const jsonfile = require("jsonfile");
const file_path = "./DB/open-beer-database.json";
const lastIdOfBreweries = require("./initTheId.js");
let lastIdBrewery = lastIdOfBreweries.idBrewery;
let lastIdItems = lastIdOfBreweries.idItems;

module.exports = function (app) {
    // Brewery Calls
    app.get("/brewery", (req, res) => {
        jsonfile.readFile(file_path, function (err, content) {
            console.log("GET Request for breweries");
            let arrayToReturn = [];
            if (err) {
                console.error(err);
            }
            for (let i in content) {
                arrayToReturn[i] = {
                    name: content[i].fields.name_breweries,
                    city: content[i].fields.city,
                    country: content[i].fields.country,
                    state: content[i].fields.state,
                    coordinate: content[i].fields.coordinates
                };
            }
            res.send(arrayToReturn);
        });
    });
    // Beers Calls
    app.get("/beers", (req, res) => {
        jsonfile.readFile(file_path, function (err, content) {
            let brewery = req.query.brewery;
            let city = req.query.city;
            let arrayToReturn = [];
            let y = 0;
            if (err) {
                console.error(err);
            }
            if (brewery != undefined) {
                console.log("GET Request for Beers by Brewery");
                for (let i in content) {
                    if (brewery == content[i].fields.name_breweries) {
                        arrayToReturn[y++] = content[i];
                    };
                };
            } 
            else if (city != undefined) {
                console.log("GET Request for Beers by Cities");
                for (let i in content) {
                    if (city == content[i].fields.city) {
                        arrayToReturn[y++] = content[i];
                    };
                };
            }
            else {
                console.log("GET Request for Beers");
                for (let i in content) {
                    arrayToReturn[i] = {
                        brewery: content[i].fields.name_breweries,
                        name: content[i].fields.name,
                        style: content[i].fields.style_name,
                        abv: content[i].fields.abv
                    };
                };
            };
            res.send(arrayToReturn);
        });
    });
    // Post new beer and Brewery
    app.post("/beers", (req, res) => {
        let { name_breweries, city, country, state, coordinates1, coordinates2, name, style_name, abv } = req.body;
        let breweryId = "";
        jsonfile.readFile(file_path, function (err, content) {
            console.log("POST Request on breweries");
            if (err) {
                console.error(err);
            }
            for (let key in content) {
                if (content[key].fields.name_breweries === name_breweries) {
                    breweryId = content[key].fields.brewery_id;
                }
            }
            if (breweryId === "") {
                lastIdBrewery += 1;
                breweryId = lastIdBrewery.toString();
            }
            lastIdItems += 1;
            let breweryObject = {
                fields: {
                    brewery_id: breweryId,
                    name_breweries: name_breweries,
                    city: city,
                    country: country,
                    state: state,
                    coordinates: [coordinates1, coordinates2],
                    name: name,
                    style_name: style_name,
                    abv: abv,
                    _id: lastIdItems.toString()
                }
            }
            content.push(breweryObject);
            jsonfile.writeFile(file_path, content, function (err) {
                if (err) {
                    console.error(err);
                }
            });
            res.send("POST on Brewery OK");
        });
    });
    app.put("/beers", (req, res) => {
        let { name_breweries, city, country, state, coordinates1, coordinates2, name, style_name, abv } = req.body;
        let _id = req.query.id;
        let objectToReturn = {};
        jsonfile.readFile(file_path, function (err, content) {
            for(let i in content) {
                if(_id === content[i].fields._id) {
                    objectToReturn = content[i];
                    if(name_breweries != "" || name_breweries != undefined) {
                        objectToReturn.fields.name_breweries = name_breweries;
                    };
                    if(city != "" || city != undefined) {
                        objectToReturn.fields.city = city;
                    };
                    if(country != "" || country != undefined) {
                        objectToReturn.fields.country = country;
                    };
                    if(state != "" || state != undefined) {
                        objectToReturn.fields.state = state;
                    };
                    if(coordinates1 != "" || coordinates1 != undefined) {
                        objectToReturn.fields.coordinates = [coordinates1, coordinates2];
                    };
                    if(name != "" || name != undefined) {
                        objectToReturn.fields.name = name;
                    };
                    if(style_name != "" || style_name != undefined) {
                        objectToReturn.fields.style_name= style_name;
                    };
                    if(abv != "" ||abv != undefined) {
                        objectToReturn.fields.abv= abv;
                    };
                };
            };
            console.log(objectToReturn)
            jsonfile.writeFile(file_path, content, function (err) {
                console.log("err " + err);
            });
        });
        res.send(`PUT on ${_id}`);
    })
};