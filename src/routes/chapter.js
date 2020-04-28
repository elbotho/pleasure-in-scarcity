import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Markdown from "markdown-to-jsx";
import Gallery from "../components/gallery";
import ChapterNav from "../components/chapternav";

const Chapter = ({ index, esm, goToNextChapter }) => {
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
        route("/", true); //replace
      });
  }, [index]);

  return (
    <>
      <Gallery
        images={chapterData.galleryImages}
        esm={esm}
        goToNextChapter={goToNextChapter}
      />

      <main>
        <h1>
          {index !== 0 && <>Chapter {index}: </>}
          {chapterData !== {} ? chapterData.title : "…"}
        </h1>
        {chapterData.content ? <Markdown>{chapterData.content}</Markdown> : "…"}
        <ChapterNav currentChapter={parseInt(index)} />
      </main>
    </>
  );
};

export default Chapter;
