const express = require("express");
const router = express.Router();
const Post = require("../models/Posts.js");

//gets back all the posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

//submits a post
router.post("/", (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  post
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
});

//specific post now
router.get("/:postId", async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete a specific post
router.delete("/:postId", async (req, res) => {
  try {
    const removed = await Post.remove({ _id: req.params.postId });
    res.json(removed);
  } catch (err) {
    res.json({ message: err });
  }
});

//update a specific post
router.patch("/:postId", async (req, res) => {
  try {
    const updated = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title } }
    );
    res.json(updated);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
