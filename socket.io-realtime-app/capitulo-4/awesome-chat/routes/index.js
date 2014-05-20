var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/rooms', function(req, res) {
  res.render('rooms', {title: 'Express rooms'});
});

module.exports = router;

