export const chapterContent = [
  { title: "Hidden Chapter 0", content: "Honestly what are you doing here?" },
  {
    title: "The future is scarcity",
    content: [
      <p class="pleasure-text">
        Soft smoke rises from the chimney. Then it disappears as the oven reaches 
        its temperature, the air flow becomes audible, a roaring sounds from within 
        the metal that gives the rocket stove its name. While the thermometer is 
        rising in small increments, just barely climbing up the 200° mark, I get the dough ready. 
      </p>,
      <p class="text">
        Rarely has there been a moment in recent Western memory when we have become aware 
        of the scarcity of things. While I‘m writing this text under the shadow of the Corona 
        crisis, supermarket shelves are empty and access to basic commodities is restricted. 
        Already now we know that after this, the world will not be the same. 
      </p>,
      <p class="pleasure-text">
        The dough was rising over night outside in the fresh April air. Seemingly worthless resources 
        like water, flour and salt become alive, fermenting into a sculpture full of sensational 
        potential, softly resisting the touch of my fingers.
      </p>,
    ],
  },
  { title: "Another Chapter Title", content: [<p>Shorter this time</p>] },
];

const Chapter = ({ number }) => {
  return (
    <main>
      <h1>
        Chapter {number}: {chapterContent[number].title}
      </h1>
      {chapterContent[number].content}
    </main>
  );
};
export default Chapter;
