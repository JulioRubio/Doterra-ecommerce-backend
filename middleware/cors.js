function cors(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,sessiontoken");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
    if (req.method === "OPTIONS") {
      return res.send(204);
    }
    next();
}

module.exports = cors;