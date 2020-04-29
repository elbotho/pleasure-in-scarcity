const ChapterNav = ({ currentChapter }) => {
  return (
    <footer>
      {currentChapter !== 0 && (
        <a
          class="button"
          href={
            !currentChapter || currentChapter < 2
              ? "/"
              : "/chapter/" + (currentChapter - 1)
          }
        >
          {currentChapter === 1 ? "Start" : "Previous Chapter"}
        </a>
      )}
      <a class="button" href="/toc">
        Table of Contents
      </a>
      <a class="button" href={"/chapter/" + (currentChapter + 1)}>
        Next Chapter
      </a>
    </footer>
  );
};

export default ChapterNav;
