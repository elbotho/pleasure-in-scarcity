import { h, Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Router, route } from "preact-router";

import Header from "./header";
import Gallery from "./gallery";

/*
TODO: lazyload images
        https://github.com/tuupola/lazyload or https://github.com/aFarkas/lazysizes or custom
      code split chapters?
      maybe even use code spliting for image routes?

      maybe rebuild slider functions in react?
*/

// Code-splitting is automated for routes
const images = [
  {
    title: "soft smoke rising",
    fileName: "pleasure1",
    extraStyle: "object-position: 50% 50%;" ,
    caption: "",
  },
  {
    title: "disused and marekd metal container",
    fileName: "pleasure2",
    extraStyle: "object-position: 50% 50%;",
    caption: "",
  },
  {
    title: "fire in the chimney",
    fileName: "pleasure3",
    extraStyle: "object-position: 50% 50%;",
    caption: "",
  },
  {
    title: "flame in glass chimney",
    fileName: "pleasure4",
    extraStyle: "object-position: 50% 50%;",
    caption: "",
  },
  {
    title: "50°C",
    fileName: "pleasure5",
    extraStyle: "object-position: 50% 50%;",
    caption: "rising",
  },
  {
    title: "dough",
    fileName: "pleasure6",
    extraStyle: "object-position: 50% 50%;",
    caption: "",
  },
];

import Home from "../routes/home";
import Chapter from "../routes/chapter";

export default function App() {
  const [energySaveMode, setEnergySaveMode] = useState(false);

  const [serverLog, setServerLog] = useState({
    mVBattery: 0,
    mALoad: 0,
    mVPV: 0,
    powerPV: 0,
  });

  useEffect(() => {
    console.log("getting server log.");
    fetch("/assets/data.json")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setServerLog(data.log);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
      });
  }, []);

  function handleRoute(e) {
    console.log(e);
  }

  function onEsmButtonClick(e) {
    e.preventDefault();
    setEnergySaveMode(!energySaveMode);
  }

  function nextChapter() {
    const pathParts = location.pathname.split("/");

    if (pathParts[1] !== "chapter") route("/chapter/1");
    if (pathParts[1] === "chapter") {
      const nextChapter = parseInt(pathParts[2]) + 1;
      if (nextChapter < 100) {
        //TODO: get real chapter length somehow
        route("/chapter/" + nextChapter);
      }
      route("/");
    }
  }

  return (
    <div id="app">
      <Header
        mVBattery={serverLog.mVBattery}
        mALoad={serverLog.mALoad}
        mVPV={serverLog.mVPV}
        powerPV={serverLog.powerPV}
        esmButton={
          <a class="button" onClick={onEsmButtonClick}>
            {energySaveMode
              ? "Turn energy saving off"
              : "Activate energy saving"}
          </a>
        }
      />
      <Gallery images={images} esm={energySaveMode} nextChapter={nextChapter} />
      <Router onChange={handleRoute}>
        <Home path="/" />
        <Chapter path="/chapter/:number" />
      </Router>
    </div>
  );
}
