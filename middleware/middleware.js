function middleware(req, res, next) {
  console.log("Inside the middleware");

  req.test = {};
  req.test = {
      message: "This was added inside the middleware"
  }

  next();
}

module.exports = middleware;