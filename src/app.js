const path = require('path');
const express = require('express');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// Setup handlebars engine and vies location
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather', 
    name: 'Andrew Reynolds'
  });
})


app.get('/about', (req, res)=>{
  res.render('about', {
    title: 'About Me', 
    name: 'Andrew Reynolds'
  });
})

app.get('/help', (req, res)=>{
  res.render('help', {
    message: 'Take a look at our FAQ!'
  })
});

app.get('/weather', (req,res)=>{
  res.send([
    {
      location: 'Vancouver',
      forecast: 'Sunny with clouds'
    },
    {
      location: 'Toronto',
      forecast: 'Overcast and hot'
    }
  ]);
});


app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
})