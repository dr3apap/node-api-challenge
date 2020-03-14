function logger(req, res, next) {
  const method = req.method;
  const endPoint = req.originalUrl;
  const date = new Date().toString();
  next();
  console.log(`${method} to ${endPoint} at ${date}`);
}
module.exports = logger;
