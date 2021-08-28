// selected html element for Global Cases
const active = document.getElementById("active");
const death = document.getElementById("death");
const recovered = document.getElementById("recovered");

// input field is selected
const input = document.getElementById("SearchField");

// to store fetched data
let fetchedData;

// selecting country case element
const CountryActive = document.getElementById("activeS");
const CountryRecovered = document.getElementById("recoveredS");
const CountryDeath = document.getElementById("deathS");
const CurrentCountry = document.getElementById("currentCountry");


// function to fetch the data
window.onload = function () {
  fetch("https://api.covid19api.com/summary")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      console.log(data.Global);
      console.log(data.Countries);

      fetchedData = data.Countries;
      active.innerHTML = data.Global.NewConfirmed;
      death.innerHTML = data.Global.NewDeaths;
      recovered.innerHTML = data.Global.NewRecovered;

      consoleCountry(data);
    });
};

// showing data in list
function consoleCountry(data) {
  console.log(data.Countries[1]);

  const len = data.Countries;
  console.log(len.length);


  let count = 0;
  var innerList = document.querySelector("#innerList");
  innerList.innerHTML = len
    .map(function (wizard, count) {
      count++;
      return `<ul>
      <li>${count} </li>
        <li>${wizard.Country} </li>
        <li>${wizard.CountryCode} </li>
        <li>${wizard.NewConfirmed} </li>
        <li>${wizard.NewRecovered} </li>
        <li>${wizard.NewDeaths} </li>
      </ul>`;
    })
    .join("");
}

// taking input value on enter
input.addEventListener("keydown", function (e) {
  if (e.which === 13) {
    if (input.value != "" && input.value != null && input.value.length > 0) {
      console.log("fetched");
      console.log("data ", fetchedData);

      for (var i = 0; i < fetchedData.length; i++) {
        if (fetchedData[i].Country == input.value) {
          console.log("country is found");
          console.log(fetchedData[i]);
          CountryActive.innerHTML = fetchedData[i].NewConfirmed;
          CountryRecovered.innerHTML = fetchedData[i].NewRecovered;
          CountryDeath.innerHTML = fetchedData[i].NewDeaths;
          CurrentCountry.innerHTML = fetchedData[i].Country;
        }
      }
    } else {
      alert("Enter Country name first");
    }
  }
});

