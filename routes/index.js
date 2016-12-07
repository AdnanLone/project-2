var express = require('express');
var router = express.Router();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var dir = require('node-dir')

/* GET home page */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login', user: req.user });
});

/* GET about page */
router.get('/about', function(req, res) {
  res.render('about', { title: 'About', user: req.user });
});



/* GET contact page */
router.get('/profile', function(req, res) {
  if(req.user) {
// res.render('index');

    res.render('profile', { title: 'Profile', user: req.user });
  } else {
    res.redirect("/login");
  }
  
});

/* GET login page */
router.get('/login', function(req, res) {
  res.render('login', { title: 'Log In', user: req.user });
});

// for getting the list of uploaded files
router.get('/getfiles', function(req, res) {
  var location = __dirname + '/../uploads/';
console.log(location);
  dir.files(location, function(err, files) {
    if (err) throw err;
    console.log(files);
    res.json([files]);
  });

});

router.post('/upload', function(req, res) {

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/../uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});


module.exports = router;
