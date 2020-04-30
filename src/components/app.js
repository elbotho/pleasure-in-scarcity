import { h, Component } from "preact";
import { useState, useEffect } from "preact/hooks";
import { Router, route } from "preact-router";
import Header from "./header";

/*
TODO: lazyload images
        https://github.com/tuupola/lazyload or https://github.com/aFarkas/lazysizes or custom
      code split chapters?
      maybe even use code spliting for image routes?

      maybe rebuild slider functions in react?
*/

// Code-splitting is automated for routes

import Home from "../routes/home";
import Chapter from "../routes/chapter";
import TOC from "../routes/toc";

export default function App(props) {
  const [energySaveMode, setEnergySaveMode] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);

  const [serverLog, setServerLog] = useState({
    mVBattery: 0,
    mALoad: 0,
    mVPV: 0,
    powerPV: 0,
  });

  useEffect(() => {
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
    if (e.current.props.index !== undefined)
      setCurrentChapter(parseInt(e.current.props.index));
  }

  function onEsmButtonClick(e) {
    e.preventDefault();
    setEnergySaveMode(!energySaveMode);
  }

  useEffect(() => {
    if (energySaveMode) document.body.classList.add("esm");
    else document.body.classList.remove("esm");
  }, [energySaveMode]);

  function goToNextChapter() {
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

  // console.log(window.location.pathname);
  // console.log("WWWW");
  return (
    <div id="app">
      <Header
        initialShowNotice={
          currentChapter === 0 && window.location.pathname === "/"
        }
        mVBattery={serverLog.mVBattery}
        mALoad={serverLog.mALoad}
        mVPV={serverLog.mVPV}
        powerPV={serverLog.powerPV}
        esmButton={
          <a id="esm-button" class="button" onClick={onEsmButtonClick}>
            {energySaveMode
              ? "Turn energy saving off"
              : "Activate energy saving"}
          </a>
        }
      />
      <Router onChange={handleRoute}>
        <Chapter
          path="/"
          esm={energySaveMode}
          goToNextChapter={goToNextChapter}
          index={0}
        />
        <Chapter
          path="/chapter/:index"
          esm={energySaveMode}
          goToNextChapter={goToNextChapter}
        />
        <TOC path="/toc" lastPath={window.location.pathname} />
      </Router>
    </div>
  );
}
