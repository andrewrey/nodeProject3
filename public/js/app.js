// DOM element
const weather = document.querySelector('.weather-info');

fetch('http://localhost:3000/weather?address=vancouver')
  .then(res => res.json())
  .then(data => {
    if(data.error)
    {alert(data.error);
    } else {
     weather.innerHTML = data.forecast;
    }
  });




