import { useState, useEffect } from "preact/hooks";
import Markdown from "markdown-to-jsx";

const Header = ({
  mVBattery,
  mALoad,
  mVPV,
  esmButton,
  powerPV,
  initialShowNotice,
}) => {
  const [showExplanation, setShowExplanation] = useState(initialShowNotice);

  const voltageString = (mVBattery / 1000).toFixed(2) + "V";
  const loadString = ((mALoad * mVBattery) / 1000000).toFixed(2) + "W";
  const solarString = powerPV + "W";
  const batteryString =
    (((mVBattery - 10800) / (14660 - 10800)) * 100).toFixed(0) + "%";
  const VPV = mVPV / 1000;
  {
    /*
    const sunString = VPV < 4 ? "🌔 Night" : VPV < 13 ? "🌥 Cloudy" : "🌞Sunny";
*/
  }
  const sunString =
    VPV < 4
      ? "solar: off, nighttime"
      : VPV < 14
      ? "solar: off, overcast"
      : "solar: on | " + solarString;
  const statusString =
    VPV > 14
      ? "battery: charging " + batteryString
      : "battery: discharging " + batteryString;

  function closeNotice(e) {
    e.preventDefault();
    setShowExplanation(false);
  }

  function toggleNotice(e) {
    e.preventDefault();
    setShowExplanation(!showExplanation);
  }

  return (
    <header>
      <div class="stats">
        <span id="stats-general">{statusString}</span>
        <div>
          <span id="stats-sun">{sunString}</span>
          {/*<span id="stats-sun">{statusString}</span>*/}
          <dl>
            <dt role="img" title="Battery Charge">
              {/*🔋*/}
              battery:
            </dt>
            <dd id="stats-battery">{voltageString}</dd>
            <dt role="img" title="Server load">
              {/*⚡*/}
              server load:
            </dt>
            <dd id="stats-load">{loadString}</dd>
          </dl>
          <a style={{ textDecoration: "underline" }} onClick={toggleNotice}>
            {showExplanation ? "close" : "info"}
          </a>
        </div>

        {showExplanation && <Explanation close={closeNotice} />}
      </div>
      <div class="menu-bar">
        <h1>Pleasure in Scarcity</h1>
        {esmButton}
      </div>
    </header>
  );
};

export default Header;

const Explanation = ({ close }) => {
  const [chapterData, setChapterData] = useState({});
  useEffect(() => {
    fetch(`/assets/chapters/999.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setChapterData(data);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      });
  }, []);
  const chapterTitle = chapterData !== {} ? chapterData.title : "…";

  return (
    <div class="explanation">
      <h1 dangerouslySetInnerHTML={{ __html: chapterTitle }} />
      {chapterData.content ? <Markdown>{chapterData.content}</Markdown> : "…"}
      <p>
        <a class="button" onClick={close}>
          Close Notice
        </a>
      </p>
    </div>
  );
};

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
