const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Reynolds",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Reynolds",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Take a look at our FAQ!",
    title: "Help",
    name: "Andrew Reynolds",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You need to provide a search!",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address",
    });
  }
  geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        forecast: forecastData.forecast,
        location: location,
        address: req.query.address,
        visibility: forecastData.visibility,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("error404", {
    title: "404 Error",
    errorMessage: "Help article not found, Sorry!!",
    name: "Andrew Reynolds",
  });
});

app.get("*", (req, res) => {
  res.render("error404", {
    title: "404 Error",
    errorMessage: "Page not found!",
    name: "Andrew Reynolds",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
