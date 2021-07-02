const express = require("express");
const Article = require("../models/articles.model");

const options = {
  strict: true,
  mergeParams: false,
  caseSensitive: false,
};

const router = express.Router(options);

const {
  getArticles,
  getArticle,
  deleteArticle,
} = require("../controllers/articles.controller");

router.get("/", getArticles);

router.get("/new", (req, res) => {
  res.render("new", { article: new Article() });
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;

  const article = await Article.findById(id);

  res.render("edit", { article: article });
});

router.get("/:slug", getArticle);

router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();

    next();
  },
  saveArticleAndRedirect("new")
);

router.put(
  "/:id",
  async (req, res, next) => {
    const { id } = req.params;

    req.article = await Article.findById(id);

    next();
  },
  saveArticleAndRedirect("edit")
);

router.delete("/:id", deleteArticle);

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    const { title, description, markdown } = req.body;

    (article.title = title),
    (article.description = description),
    (article.markdown = markdown);

    try {
      article = await article.save();

      res.redirect(`/articles/${article.slug}`);
    } catch (err) {
      res.redirect(`/articles/${path}`, { article: article });
    }
  };
}

module.exports = router;
