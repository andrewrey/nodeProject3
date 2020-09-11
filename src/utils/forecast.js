const request = require("request");

require("dotenv").config({ path: "../.env" });
const apiWeather = process.env.API_WEATHER;

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${apiWeather}&query=${latitude},${longitude}`;
  request({ url, json: true }, (error, response, { error: bodyError, location, request, current } = {}) => {
    if (error) {
      callback(`Unable to connect to weather services! Please try again later`, undefined);
    } else if (bodyError) {
      callback(`Location Error, Please check coordinates`, undefined);
    } else {
      callback(undefined, {
        location: location.name,
        query: request.query,
        coord: `latitude: ${location.lat}, Longitude: ${location.lon}`,
        descript: current.weather_descriptions[0],
        temperature: current.temperature,
        precip: current.precip,
        forecast: `${current.weather_descriptions}. It is currently ${current.temperature} degrees out. The percentage of precipitation is ${current.precip}.`,
      });
    }
  });
};

module.exports = forecast;
