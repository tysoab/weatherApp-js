// select elements
const searchBtn = document.querySelector("#btn-search");
const searchInput = document.querySelector(".search-box");
const weatherDetails = document.querySelector(".weather-details");
const footer = document.querySelector("footer");

// add event to the search button
/**
 * key event
 * keypress
 * keyup
 * keydown
 */

searchInput.addEventListener("keyup", async (e) => {
  if (e.key === "Enter") {
    submit();
  }
});

// search button
searchBtn.addEventListener("click", submit);

async function submit() {
  let markup = "";
  weatherDetails.innerHTML = `
  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/04de2e31234507.564a1d23645bf.gif" alt="loading..." style="width: 200px; height:200px">
  `;
  const result = await fetchWeather(searchInput.value.trim().toLowerCase());
  console.log(result.data);

  if (result.status === "success") {
    const name = result.data.location.name;
    const region = result.data.location.region;
    const image = result.data.current.condition.icon;
    const text = result.data.current.condition.text;
    const cloud = result.data.current.cloud;
    const humidity = result.data.current.humidity;
    const windKph = result.data.current.wind_kph;
    markup = `
     <div class="image">
          <img
            src="${image}"
            class="img-fluid rounded-circle"
            style="width: 110px"
            alt="${name}"
          />
        </div>

        <small>${text}</small>

        <div class="deg text-center">
          <span class="fs-1">${cloud}</span>
          <sup class="fs-4">&deg;</sup>
          <span class="fs-2">c</span>
        </div>
        <h2 class="text-center">${name}</h2>
    `;
    footer.innerHTML = `
     <div class="row">
          <div class="col-5">
            <div class="wind">
              <div class="stat">
                <i class="bi bi-cloud-fog2-fill fs-3"></i>
                <span class="fs-6">${humidity}%</span>
              </div>
              <p class="text-start">Humidity</p>
            </div>
          </div>
          <div class="col-2"></div>
          <div class="col-5">
            <div class="wind">
              <div class="stat text-center">
                <i class="bi bi-wind fs-3"></i>
                <span class="fs-6">${windKph}km/h</span>
              </div>
              <p class="text-end">Wind Speed</p>
            </div>
          </div>
        </div>
    `;
  } else {
    markup = `
    <h4>${result}</h4>
    `;
  }

  searchInput.value = "";
  weatherDetails.innerHTML = markup;
}

// fetch weather
async function fetchWeather(query) {
  try {
    const res = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=cd57794ff3ee4a6ea8b145748240603&q=${query}&aqi=no`
    );

    if (!res.ok) {
      //   return { status: false, data: "" };

      throw new Error("Error: result not available, try again later!");
    }

    const data = await res.json();
    return { status: "success", data };
  } catch (err) {
    return err.message;
  }
}
