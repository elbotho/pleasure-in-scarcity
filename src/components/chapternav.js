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
          {currentChapter === 1 ? "⭠ Frontpage" 
            : currentChapter === 2 ? "⭠ Abstract" 
            : currentChapter === 28 ? "⭠ Appendix"
            : currentChapter === 27 ? "⭠ Thanks"
            : "⭠ previous section"
          }
          </a>
      ) 
      : <a class="button toc-button" href="/chapter/1">
        Abstract ⭢
      </a> 
    }

     <a class="button toc-button" href="/toc">
        Table of Contents 
      </a>
      
      {currentChapter === 28 
        ? ""
        : 
        <a
            class="button page-navigation"
            href={
              !currentChapter || currentChapter < 2
                ? "/chapter/2"
                : "/chapter/" + (currentChapter + 1)
            }
          >
            {currentChapter === 27 ? "Bibliography ⭢"
              : currentChapter === 26 ? "Appendix ⭢"
              : currentChapter === 25 ? "Thanks ⭢"
              : currentChapter < 2 ? "start the text ⟶"
              : "next section ⭢" 
            }
        </a>
      }

    </footer>
  );
};

export default ChapterNav;
