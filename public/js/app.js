// DOM element
const weatherForm = document.querySelector("form");
const search = document.getElementById("user-location");
const weather = document.getElementById("weatherReport");
const errorMessage = document.getElementById("error-message");
const loadMessage = document.getElementById("loading-message");
// Event listener

weatherForm.addEventListener("submit", postWeather);

function postWeather(e) {
  e.preventDefault();
  let location = search.value;
  getWeather(location);
  search.value = "";
}

function getWeather(location) {
  weather.innerHTML = "";
  loadMessage.textContent = "loading...";
  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      loadMessage.textContent = "";
      if (data.error) {
        errorMessage.classList.remove("hide");
        errorMessage.innerHTML = `<p>${data.error}</p>`;
        setTimeout(() => errorMessage.classList.add("hide"), 2000);
      } else {
        weather.innerHTML = `
    <p>${data.location}</p>
    <p>${data.forecast}</p>
    `;
      }
    });
}
