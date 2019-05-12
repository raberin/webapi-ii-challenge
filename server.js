const express = require("express");

// const PostsRouter = require("./posts/posts-router.js");

const server = express();

server.use(express.json());

//Routing all CRUD requests to posts route
// server.use("/api/posts", PostsRouter);

server.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to webapi-II challenge</h1>
  `);
});

module.exports = server;
