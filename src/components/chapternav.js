const ChapterNav = ({ currentChapter }) => {
  return (
    <footer>
      {currentChapter !== 0 && (
        <a
          class="button page-navigation"
          href={
            !currentChapter || currentChapter < 2
              ? "/"
              : "/chapter/" + (currentChapter - 1)
          }
        >
          {currentChapter === 1 ? "Start" : "previous paragraph"}
        </a>
      )}
      <a class="button toc-button" href="/toc">
        Table of Contents
      </a>
      <a class="button page-navigation" href={"/chapter/" + (currentChapter + 1)}>
        Next Paragraph
      </a>
    </footer>
  );
};

export default ChapterNav;
