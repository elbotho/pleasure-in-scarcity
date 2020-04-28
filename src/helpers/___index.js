import "../styles/index.scss";
import Tinyfade from "./tinyfade";
import swipeDetect from "./swipedetect";
import getStats from "./getstats";

// symbols: https://www.fileformat.info/info/unicode/font/arial_unicode_ms/blockview.htm?block=miscellaneous_symbols

// let tf = new Tinyfade(
//   ".tinyfade", // Element
//   -1, // Interval in milliseconds (-1 for manual mode, default = 5000)
//   300 // Animation duration (default = 1000)
// );

// document
//   .getElementById("gallery-right")
//   .addEventListener("click", function (e) {
//     tf.next();
//   });

// // document.getElementById("gallery-left").addEventListener("click", function () {
// //   tf.prev();
// // });

// function galleryNext() {
//   tf.next();
// }
// function galleryPrev() {
//   tf.prev();
// }

// swipeDetect(document.querySelector("figure.gallery"), galleryNext, galleryPrev);

// // let thirdImage = tf.e.getElementsByTagName("img")[2];
// // tf.goto(thirdImage);

// // // Events
// tf.addEventListener("goto", function (current, last) {
//   const allSlides = current.parentElement.querySelectorAll("img");
//   const index = [...allSlides].indexOf(current);
//   const lastIndex = [...allSlides].indexOf(last);

//   if (index === 0 && lastIndex === allSlides.length - 1) {
//     console.log("NEXT CHAPTER!");
//   }

//   setCaption(current);

//   // if (index === allSlides.length - 2)
//   // console.log("Showing " + current.src + " (last image: " + last.src + ")");
// });
// tf.destroy(); // Stop everything and delete references.

// setCaption(tf.c);

// function setCaption(elem) {
//   const allSlides = elem.parentElement.querySelectorAll("img");
//   const index = [...allSlides].indexOf(elem);

//   document.getElementById("caption-text").innerHTML = elem.dataset.caption;
//   document.getElementById("caption-index").innerText =
//     index + 1 + " /  " + allSlides.length;

//   fetch(elem.src).then((response) => {
//     const size = Math.round(response.headers.get("content-length") / 1000);
//     document.getElementById("caption-size").innerText = size + " kb";
//   });

//   // document.getElementById("caption-size").innerText = batteryVoltage + "V ";
// }

// getStats();
