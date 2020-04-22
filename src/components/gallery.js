import { h } from "preact";
import { Link } from "preact-router/match";
import { useState, useEffect } from "preact/hooks";
import Tinyfade from "../helpers/tinyfade";
import swipeDetect from "../helpers/swipedetect";

//TODO: tinyfade bug with style element when using prev?
const Gallery = ({ images, esm, nextChapter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [TinyFade, setTinyFade] = useState(0);

  useEffect(() => {
    console.log("init gallery");
    let tf = new Tinyfade(
      ".tinyfade", // Element
      -1, // interval in ms (-1 for manual mode, default = 5000)
      300 // anim duration
    );

    setTinyFade(tf);

    setFilesize(tf.c);

    function galleryNext() {
      tf.next();
    }
    function galleryPrev() {
      tf.prev();
    }
    swipeDetect(
      document.querySelector("figure.gallery"),
      galleryNext,
      galleryPrev
    );

    // let thirdImage = tf.e.getElementsByTagName("img")[2];
    // tf.goto(thirdImage);

    document.onkeydown = checkKey;

    function checkKey(e) {
      e = e || window.event;

      if (e.keyCode == "37") {
        galleryPrev();
      } else if (e.keyCode == "39") {
        galleryNext();
      }
    }
    // // Events
    tf.addEventListener("goto", function (current, last) {
      const index = parseInt(current.dataset.index);
      const lastIndex = parseInt(last.dataset.index);

      //CHANGE
      //if (current.tagName.toLowerCase() !== "img") return;

      setCurrentIndex(index);

      // console.log(index);
      // console.log(last.dataset.index);
      // console.log(images.length - 1);

      if (index === 0 && lastIndex === images.length - 1) {
        nextChapter();
      }

      setFilesize(current);
    });
  }, []);

  useEffect(() => {
    setFilesize(
      document.querySelector(`.tinyfade > img[data-index="${currentIndex}"]`)
    );
  }, [esm]);

  function onRightArrowClick(e) {
    e.preventDefault();
    TinyFade.next();
  }

  function setFilesize(elem) {
    fetch(elem.src).then((response) => {
      const size = Math.round(response.headers.get("content-length") / 1000);
      document.getElementById("caption-size").innerHTML = size + " kb";
    });
  }

  const folder = esm ? "/assets/images/esm/" : "/assets/images/";

  return (
    <figure class="gallery">
      <div class="tinyfade">
        {images.map((image, index) => (
          <img
            key={image.title}
            data-index={index}
            alt={image.title}
            src={folder + image.fileName}
            style={image.extraStyle}
          />
        ))}
      </div>
      <a
        class="gallery-arrow right"
        id="gallery-right"
        onClick={onRightArrowClick}
      >
        →
      </a>
      <figcaption>
        <p id="caption-text">{images[currentIndex].caption}</p>
        <p>
          <span id="caption-index">
            {currentIndex + 1} / {images.length}
          </span>
          <br />
          <span id="caption-size"></span>
        </p>
      </figcaption>
    </figure>
  );
};

export default Gallery;

// const Image = ({ title, fileName, extraStyle }) => (
//   <img alt={title} src={"/assets/images/" + fileName} style={extraStyle} />
// );

// if (index === allSlides.length - 2)
// console.log("Showing " + current.src + " (last image: " + last.src + ")");
