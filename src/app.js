const path = require('path');
const express = require('express');
const publicDirectoryPath = path.join(__dirname, '../public');


const app = express();
app.use(express.static(publicDirectoryPath));



app.get('/weather', (req,res)=>{
  res.send([
    {
      location: 'Vancouver',
      forecast: 'Sunny with clouds'
    },
    {
      location: 'Toronoto',
      forecast: 'Overcast and hot'
    }
  ]);
});


app.listen(3000, ()=>{
  console.log('Server is up on port 3000');
})