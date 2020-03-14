const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("../logger/logger");
const projectRouter = require("../router/projectRouter");
const actionRouter = require("../router/actionRouter");

const server = express();

server.use(express.json());

server.use("/api/projects", logger, projectRouter);
server.use("/api/action", logger, actionRouter);

server.get("/", (req, res) => {
  res.send(`<h2>Here is my first Node Express Project</h2>`);
  console.lod("in the server");
});

module.exports = server;
