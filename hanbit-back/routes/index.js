var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index',{"title":"index"});
});

router.get('/product',function(req,res,next){
    res.render('product',{"title":"product"});
});

router.get('/construct',function(req,res,next){
    res.render('construct',{"title":"construct"});
});

router.get('/estimate',function(req,res,next){
    res.render('estimate',{"title":"estimate"});
});

router.get('/etc',function(req,res,next){
    res.render('etc',{"title":"etc"}); 
});

router.get('/cookie',function(req,res,next){
    res.cookie('test','hello');
    res.send("create cookie");
});

module.exports = router;
