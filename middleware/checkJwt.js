const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const {AUDIENCE, DOMAIN} = require('../config')

// Authorization middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and 
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: DOMAIN + `.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: AUDIENCE,
  issuer: [DOMAIN],
  algorithms: ['RS256']
});

module.exports = checkJwt;