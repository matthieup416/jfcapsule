var express = require('express');
var router = express.Router();
var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dvqjak***', 
  api_key: '767287626552***', 
  api_secret: 'BRfbaQzy3xSWMq0dNqdLAS***' 
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', async function(req, res, next) {
  
  var pictureName = './tmp/'+uniqid()+'.jpg';
  var resultCopy = await req.files.avatar.mv(pictureName);
  if(!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName);
    res.json(resultCloudinary);
  } else {
    res.json({error: resultCopy});
  }

  fs.unlinkSync(pictureName);
  
});

module.exports = router;
