var AuthServices =  require("../services/AuthService")
var Auth = new AuthServices();

    function signup(req, res, next) {
        console.log(req.query.password);
        console.log("Was something printed above?");
        Auth.SignUp(req.query.email, req.query.password, req.query.name).then(
            (doc) => {
                console.log("New Document: ", doc);
                return next();
            }).catch((err) => res.status(403).send(err.message));
    }

    function signin(req, res, next) {
        console.log("Is something printed below?");
        console.log(req.query.password);
        Auth.Login(req.query.name, req.query.password).then(
            (doc) => {
                console.log("New Document with token: ", doc);

                res.send(doc);     
            }).catch((err) => res.status(401).send(err.message));
    }


    what = (req, res) => res.send('sign up successful! Please log in.');
    


module.exports.signup = signup
module.exports.signin = signin
module.exports.what = what