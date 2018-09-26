var express = require('express');
var router = express.Router();

/* GET reports lists. */
router.get('/', function(req, res, next) {
  res.json({status: "Reports Success"});
});

module.exports = router;
