// import { h } from "preact";
// import { Link } from "preact-router/match";

const Header = ({ mVBattery, mALoad, mVPV, esmButton }) => {
  const voltageString = (mVBattery / 1000).toFixed(1) + "V";
  const loadString = (mALoad * 12) / 1000 + "W";

  const VPV = mVPV / 1000;
  const sunString = VPV < 4 ? "🌔 Night" : VPV < 13 ? "🌥 Cloudy" : "🌞Sunny";
  const statusString =
    VPV > 13 ? "Status: charging" : "Status: draining battery";

  return (
    <header>
      <div class="stats">
        <span id="stats-general">{statusString}</span>

        <div>
          <span id="stats-sun">{sunString}</span>
          <dl>
            <dt role="img" title="Battery Charge">
              🔋
            </dt>
            <dd id="stats-battery">{voltageString}</dd>
            <dt role="img" title="Server load">
              ⚡
            </dt>
            <dd id="stats-load">{loadString}</dd>
          </dl>
        </div>
      </div>

      <div class="menu-bar">
        <h1>Pleasure in Scarcity</h1>
        {esmButton}
      </div>
    </header>
  );
};

export default Header;

//IDEA: Get real data when appid is working
//https://samples.openweathermap.org/data/2.5/forecast?id=2867714&appid=439d4b804bc8187953eb36d2a8c26a02
// fetch("/public/weather_example.json")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     buildWeather(data.list);
//   })
//   .catch(function (err) {
//     console.warn("Something went wrong.", err);
//   });

// function buildWeather(list) {
//   const today = list[0];
//   const tomorrow = list[8]; //should be same time tomorrow
//   document.getElementById("stats-weather").innerText =
//     today.weather[0].description;
//   document.getElementById("stats-clouds").innerText = today.clouds.all + "%";
//   //TODO: Tomorrow
//   console.log(tomorrow.clouds.all + "% cloudy");
// }
