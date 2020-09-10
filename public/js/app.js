// DOM element
const weatherForm = document.querySelector("form");
const search = document.getElementById("user-location");
const weather = document.getElementById("weatherReport");

// Event listener

weatherForm.addEventListener("submit", postWeather);

function postWeather(e) {
  e.preventDefault();
  let location = search.value;
  getWeather(location);
  search.value = "";
}

function getWeather(location) {
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        weather.innerHTML = `
      <p>${data.location}</p>
      <p>${data.forecast}</p>
      `;
      }
    });
}
