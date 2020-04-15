var express = require('express');
var router = express.Router();

/* Use regular expressions to specify the paths, and as many callbacks as desired.
Executing the next by calling next() */
router.get(/.*fish/, function(req, res, next) {
console.log("WHUAT");
return next();
  //res.send('Response to /example call');
}, (req, res) => res.send('NEXT!'));

module.exports = router;