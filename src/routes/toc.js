import { useState, useEffect } from "preact/hooks";

const maxChapters = 28;

export default ({ lastPath }) => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchChapter(index) {
    fetch(`/assets/chapters/${index}.json`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let _chapters = chapters;
        _chapters[index] = data.title;
        setChapters([...chapters, data.title]);
      })
      .catch(function (err) {
        console.warn("Something went wrong.", err);
        setIsLoading(false);
        return false;
      });
  }

  useEffect(() => {
    for (let i = 0; i < maxChapters; i++) {
      if (!isLoading) break;
      fetchChapter(i);
    }
  }, []);

  return (
    <>
      {/* <Gallery
      images={chapterData.galleryImages}
      esm={esm}
      goToNextChapter={goToNextChapter}
    /> */}
      <figure class="gallery">
          <figcaption>
          </figcaption>
      </figure>
      <main>
        <p>
          <a class="button" href={lastPath !== "/toc" ? lastPath : "/"}>
            Close
          </a>
        </p>
        <h1>Table of Contents</h1>
        <ol id="toc">
          {chapters.map((title, index) => {
            {/*const chapterNumText = index === 0 ? "" : `Chapter ${index}: `;*/}
            const chapterNumText = index === 0 ? "" : "";
            const chapterTitle = title;
            if (index === chapters.length - 1) return null;
            return (
              <li>
                <a
                  href={index === 0 ? "/" : `/chapter/${index}`}
                  dangerouslySetInnerHTML={{
                    __html: chapterNumText + chapterTitle,
                  }}
                ></a>
              </li>
            );
          })}
        </ol>
      </main>
    </>
  );
};
