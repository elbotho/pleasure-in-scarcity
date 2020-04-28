const { join } = require("path");
const parseMD = require("parse-md").default;
const fs = require("fs");

const { content } = parseMD(
  fs.readFileSync(join(__dirname, "content/chapters/1"), "utf-8")
);

// join(, "content/chapters")

module.exports = function () {
  return [
    {
      url: "/",
      title: "All About Dogs",
      breeds,
    },
    {
      url: "/chapter/1",
      title: "smth",
      content: content,
    },
  ];
};

/*
const { generateFileList } = require("./src/crawler");
const { join } = require("path");
const fs = require("fs");
const parseMD = require("parse-md").default;

const [chapters] = generateFileList(join(__dirname, "content/chapters")).nodes;
module.exports = () => {
  const pages = [
    {
      url: "/",
      // seo: {
      // 	cover: '/assets/profile.jpg'
      // }
    },
    // { url: '/contact/' },
    // { url: '/contact/success' }
  ];

  // adding blogs list posts page
  // pages.push({
  // 	url: '/blogs/',
  // 	data: chapters
  // });

  // adding all chapter pages
  pages.push(
    ...chapters.edges.map((chapter, index) => {
      let data;
      if (chapter.format === "md") {
        const { content } = parseMD(
          fs.readFileSync(join("content", "chapters", chapter.id), "utf-8")
        );
        data = content;
      } else {
        data = fs
          .readFileSync(join("content", "chapters", chapter.id), "utf-8")
          .replace(/---(.*(\r)?\n)*---/, "");
      }
      return {
        url: `/chapter/${index}`,
        seo: chapter.details,
        data: {
          details: chapter.details,
          content: data,
        },
      };
    })
  );

  return pages;
};
*/
