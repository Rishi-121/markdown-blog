const Article = require("../models/articles.model");

////////////// Get all the articles //////////////
const getArticles = async (req, res) => {
  let { page, size } = req.query;

  if (!page) page = 1;
  if (!size) size = 50;

  const limit = parseInt(size);
  const skip = (page - 1) * size;

  const articles = await Article.find()
    .sort("-createdAt")
    .limit(limit)
    .skip(skip);

  res.render("index", { articles: articles });
};

////////////// Get an article //////////////
const getArticle = async (req, res) => {
  const { slug } = req.params;

  const article = await Article.findOne({ slug });

  if (!article) {
    res.redirect("/articles");
  }

  res.render("show", { article: article });
};

////////////// Delete an article //////////////
const deleteArticle = async (req, res) => {
  const { id } = req.params;

  await Article.findByIdAndDelete(id);

  res.redirect("/articles");
};

module.exports = {
  getArticles,
  getArticle,
  deleteArticle,
};
