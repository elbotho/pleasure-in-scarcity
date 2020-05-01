import { h } from "preact";
import { Link } from "preact-router/match";
import { useState, useEffect } from "preact/hooks";
import Tinyfade from "../helpers/tinyfade";
import swipeDetect from "../helpers/swipedetect";

//TODO: tinyfade bug with style element when using prev?
const Gallery = ({ images, esm, goToNextChapter }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [TinyFade, setTinyFade] = useState(0);
  const [hide, setHide] = useState(false);

  if (!images) return "…";

  useEffect(() => {
    setHide(false);
    if (hide) return;

    let tf = new Tinyfade(
      "#tinyfade", // Element
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

      // console.log(`${index} should be 0`);
      // console.log(`${lastIndex} should be ${images.length - 1}`);

      if (
        index === 0 &&
        (lastIndex === images.length - 1 ||
          (images.length - 1 === 1 && lastIndex === 0))
      ) {
        goToNextChapter();
        setHide(true);
      }

      setFilesize(current);
    });
  }, [images, hide]);

  useEffect(() => {
    setFilesize(
      document.querySelector(
        `#tinyfade > picture[data-index="${currentIndex}"]`
      )
    );
  }, [esm]);

  function onRightArrowClick(e) {
    e.preventDefault();
    TinyFade.next();
  }

  function onLeftArrowClick(e) {
    e.preventDefault();
    TinyFade.prev();
  }

  function setFilesize(elem) {
    const image = elem.querySelector("img");
    fetch(image.src).then((response) => {
      const size = Math.round(response.headers.get("content-length") / 1000);
      const sizeDisplay = document.getElementById("caption-size");
      if (!sizeDisplay) return;
      sizeDisplay.innerHTML = size + " kb";
    });
  }

  if (hide)
    return (
      <figure class="gallery">
        <div id="tinyfade" class="tinyfade">
          …
        </div>
      </figure>
    );

  return (
    <figure class="gallery">
      <div id="tinyfade" class="tinyfade">
        {images.map((image, index) => {
          const img = image.image;
          const imgSrc = esm
            ? img.src.replace("/images/", "/images-esm/").replace("jpg", "png")
            : img.src;
          return (
            <picture key={img.title} data-index={index}>
              <img
                src={imgSrc}
                alt={img.title}
                // style={img.extraStyle}
              />
            </picture>
          );
        })}
      </div>
      {currentIndex !== 0 && (
        <a
          class="gallery-arrow left"
          id="gallery-left"
          onClick={onLeftArrowClick}
        >
          ➞
        </a>
      )}
      <a
        class="gallery-arrow right"
        id="gallery-right"
        onClick={onRightArrowClick}
      >
        ➞
      </a>
      <figcaption>
        <p id="caption-text">
          {images[currentIndex] ? images[currentIndex].image.caption : ""}
        </p>
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
