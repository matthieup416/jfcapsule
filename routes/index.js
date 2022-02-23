var express = require('express')
var router = express.Router()
var uniqid = require('uniqid')
var fs = require('fs')

var cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'matthieudev',
  api_key: '633726389759375',
  api_secret: '5QYtAd670KXAfa9UADMIUPxsu2A',
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.post('/upload', async function (req, res, next) {
  var pictureName = './tmp/' + uniqid() + '.jpg'
  var resultCopy = await req.files.avatar.mv(pictureName)
  console.log('resultCopy : ', resultCopy)
  if (!resultCopy) {
    var resultCloudinary = await cloudinary.uploader.upload(pictureName)
    res.json(resultCloudinary)
  } else {
    res.json({ error: resultCopy })
  }

  fs.unlinkSync(pictureName)
})

module.exports = router
