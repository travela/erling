var AuthServices =  require("../services/AuthService")
var Auth = new AuthServices();

const getTokenFromHeader = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
    }
  }

function verifyToken(req) {
    jwt.verify(getTokenFromHeader(req), Auth.signature, function(err, decoded) {
        if(err) res.status(401).end('Not authenticated. Please, Login again.'); 
        else {
            req.tokenData = decoded;
            next();
        }
    })
  }



module.exports.isAuth = verifyToken