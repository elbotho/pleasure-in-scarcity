import { h, Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Router, route } from "preact-router";

import Header from "./header";
import Gallery from "./gallery";

// Code-splitting is automated for routes
// simplify routes
const images = [
  {
    title: "Smoke Pipe",
    fileName: "demo.webp",
    extraStyle: "object-position: 50% 30%;",
    caption: "This is an image Caption yeah",
  },
  {
    title: "Sencond Pipe",
    fileName: "demo.webp",
    extraStyle: "object-position: 20% 10%;",
    caption: "Caption Two",
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
      if (nextChapter < 3) {
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
