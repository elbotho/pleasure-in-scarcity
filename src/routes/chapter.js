import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { route } from "preact-router";
import Markdown from "markdown-to-jsx";
import Gallery from "../components/gallery";
import ChapterNav from "../components/chapternav";

const Chapter = ({ index, esm, goToNextChapter }) => {
  const [chapterData, setChapterData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/assets/chapters/${index}.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setChapterData(data);
        setIsLoading(false);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
        route("/", true); //replace
      });
  }, [index]);

  {/*const chapterNumText = index === 0 ? "" : `Chapter ${index}: `;*/}
  const chapterNumText = index === 0 ? "" :  "";
  const chapterTitle = chapterData !== {} ? chapterData.title : "…";
  return (
    <>
      <Gallery
        images={chapterData.galleryImages}
        esm={esm}
        goToNextChapter={goToNextChapter}
      />

      <main>
        <h1
          dangerouslySetInnerHTML={{
            __html: chapterNumText + chapterTitle,
          }}
        />
        {chapterData.content ? <Markdown>{chapterData.content}</Markdown> : "…"}
        <ChapterNav currentChapter={parseInt(index)} />
      </main>
    </>
  );
};

export default Chapter;
