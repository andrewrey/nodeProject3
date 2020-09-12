const request = require("request");
require("dotenv").config();

const apiGeo = process.env.API_GEO;

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${apiGeo}`;
  request({ url, json: true }, (error, response, { features }) => {
    if (error) {
      callback(`Unable to connect to location services!`, undefined);
    } else if (features.length === 0) {
      callback(`Unable to find location, please try again!`, undefined);
    } else {
      callback(undefined, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
