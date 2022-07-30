var express = require('express');
var router = express.Router();
var controller = require("../controller/controller");

/* GET users listing. */
router.get('/', function (req, res, next) {
   res.send('respond with a resource');
});

//사용자API
router.get('/getProduct/:id', function (req, res, next) {
   controller.getProduct(req, res);
});

router.get('/getProducts/:index/:tag/:order', function (req, res, next) {
   controller.getProducts(req, res);
});

router.get('/getConstruct/:id', function (req, res, next) {
   controller.getConstruct(req, res);
});

router.get('/getConstructs/:index/:space/:tag/:fire/:auto/:order', function (req, res, next) {
   controller.getConstructs(req, res);
});

router.get('/getLikeConstructs', function (req, res, next) {
   controller.getLikeConstructs(req, res);
});

//제품소개관리

router.post('/addProduct', controller.productUpload.fields([{ name: 'mainImage' }, { name: 'sample1Image' }, { name: 'sample2Image' }, { name: 'sample3Image' }]), function (req, res, next) {
   controller.addProduct(req, res);
});

//제품삭제
router.post('/delProduct', function (req, res, next) {
   controller.delProduct(req, res);
});


//시공모음관리

router.post('/addConstruct', controller.constructmainUpload.fields([{ name: 'mainImage' }]), function (req, res, next) {
   console.log("[addConstruct] Post");
   controller.addConstruct(req, res);
});

router.post('/constructUpload', controller.constructUpload.array('file', 10), function (req, res, next) {
   console.log("[constructUpload] log.");
   let promises = new Array();
   promises.push(controller.constrcutImageResize('public/c_images/', req.files[0].filename));

   Promise.all(promises)
      .then(() => {
         res.end("&bNewLine=true&sFileName=" + req.files[0].filename + "&sFileURL=" + "/c_images/" + req.files[0].filename);
      })
      .catch((err) => {
         console.log(err);
         res.end("&bNewLine=true&sFileName=" + req.files[0].filename + "&sFileURL=" + "/c_images/" + req.files[0].filename);
      });
});

//시공모음삭제
router.post('/delConstruct', function (req, res, next) {
   controller.delConstruct(req, res);
});



//기타관리
router.post('/addTag', function (req, res, next) {
   controller.addTag(req, res);
});

router.post('/delTag', function (req, res, next) {
   controller.delTag(req, res);
});

router.get('/getTag', function (req, res, next) {
   controller.getTag(req, res);
});

router.post('/addColor', function (req, res, next) {
   controller.addColor(req, res);
});

router.post('/delColor', function (req, res, next) {
   controller.delColor(req, res);
});

router.get('/getColor', function (req, res, next) {
   controller.getColor(req, res);
});

router.post('/addSpace', function (req, res, next) {
   controller.addSpace(req, res);
});

router.post('/delSpace', function (req, res, next) {
   controller.delSpace(req, res);
});

router.get('/getSpace', function (req, res, next) {
   controller.getSpace(req, res);
});

//SMS

router.post('/sms', function (req, res, next) {
   controller.pushSMS(req, res);
});

module.exports = router;
