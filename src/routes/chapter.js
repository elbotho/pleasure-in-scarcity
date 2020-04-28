import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
// import { usePrerenderData } from "@preact/prerender-data-provider";
import Markdown from "markdown-to-jsx";
import Gallery from "../components/gallery";

const Chapter = ({ index, esm, nextChapter }) => {
  const [chapterData, setChapterData] = useState({});
  useEffect(() => {
    fetch(`/assets/chapters/${index}.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setChapterData(data);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
        //todo: just route to landing?
      });
  }, []);

  return (
    <>
      <Gallery
        images={chapterData.galleryImages}
        esm={esm}
        nextChapter={nextChapter}
      />

      <main>
        <h1>
          Chapter {index}: {chapterData !== {} ? chapterData.title : "…"}
        </h1>
        {chapterData.content ? <Markdown>{chapterData.content}</Markdown> : "…"}
      </main>
    </>
  );
};

export default Chapter;
