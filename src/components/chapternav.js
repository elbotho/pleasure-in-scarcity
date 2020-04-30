const ChapterNav = ({ currentChapter }) => {
  return (
    <footer>
      {currentChapter !== 0 ? (
        <a
          class="button page-navigation"
          href={
            !currentChapter || currentChapter < 2
              ? "/"
              : "/chapter/" + (currentChapter - 1)
          }
        >
          {currentChapter === 1 ? "Frontpage" : currentChapter === 2 ? "abstract" :"previous paragraph"}
        </a>
      ) 
      : <a class="button toc-button" href="/chapter/1">
        Abstract
      </a> 
    }

     <a class="button toc-button" href="/toc">
        Table of Contents
      </a>
      

        <a
          class="button page-navigation"
          href={
            !currentChapter || currentChapter < 2
              ? "/chapter/2"
              : "/chapter/" + (currentChapter + 1)
          }
        >
          {currentChapter > 1 ? "next paragraph" : "start the text"}
      </a>
      

    </footer>
  );
};

export default ChapterNav;
