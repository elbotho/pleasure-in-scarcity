export const chapterContent = [
  { title: "Hidden Chapter 0", content: "Honestly what are you doing here?" },
  {
    title: "The Chapter Title",
    content: [
      <p>
        Scarcity refers to a gap between limited resources and theoretically
        limitless wants.[2] The notion of scarcity is that there is never enough
        (of something) to satisfy all conceivable human wants, even at advanced
        states of human technology. Scarcity involves making a sacrifice—giving
        something up, or making a trade-off—in order to obtain more of the
        scarce resource that is wanted.[3] The condition of scarcity in the real
        world necessitates competition for scarce resources, and competition
        occurs "when people strive to meet the criteria that are being used to
        determine who gets what".[3]:p. 105 The price system, or market prices,
        are one way to allocate scarce resources. "If a society coordinates
        economic plans on the basis of willingness to pay money, members of that
        society will [strive to compete] to make money"[3]:p. 105 If other
        criteria are used, we would expect to see competition in terms of those
        other criteria.[3] For example, although air is more important to us
        than gold, it is less scarce simply because the production cost of air
        is zero. Gold on the other hand has a high production cost. It has to be
        found and processed, both of which require a great deal of resources.
        Additionally, scarcity implies that not all of society's goals can be
        pursued at the same time; trade-offs are made of one goal against
        others. In an influential 1932 essay, Lionel Robbins defined economics
        as "the science which studies human behavior as a relationship between
        ends and scarce means which have alternative uses".[4] In cases of
        monopoly or monopsony an artificial scarcity can be created. Scarcity
        can also occur through stockpiling, either as an attempt to corner the
        market or for other reasons. Temporary scarcity can be caused by (and
        cause) panic buying.
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
