// import Express and the Express Router
var express = require('express');
var router  = express.Router();
var jwt     = require('jsonwebtoken');
var User    = require('../models/User');

var superSecret = 'somethingfunnyfunniestfunnier123';

// import controllers for resources
var resourcesController = require('../controllers/resources');

// define routes for our application, and send them to route handlers

router.get('/resources', resourcesController.index);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/api', function(req, res, next) {
//   res.json({message: "You made it to the API"});
// });

// AUTHENTICATION Routes
router.post('/api/authenticate', function(req, res){
  User.findOne({
    username: req.body.username
  }).select('name username password').exec(function(err, user){

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed.'
      });
    } else if (user) {
      var validPassword = user.comparePassword(req.body.password);
      if (!validPassword) {
        res.json({
          success: false,
          message: 'Authentication failed: Wrong password.'
        });
      } else {
        var token = jwt.sign({
          name: user.name,
          username: user.username,
          id: user._id
        }, supersecret, {
          expiresInMinutes: 1440
        });

        res.json({
          success: true,
          message: 'Enjoy your token, you filthy animal.',
          token: token
        });
      }
    }

  });
});

// Route MIDDLEWARE to verify a token
router.use(function(req, res, next){

  var token = req.body.token || req.param('token') || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, superSecret, function(err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        req.decoded = decoded;

        next();
      }
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// GET ME
router.get('/me', function(req, res) {
  res.send(req.decoded)
});


// CREATE A NEW USER:
router.post('/api/users', function(req, res, next) {
 var user = new User();

 console.log(req.body);

 user.name = req.body.name;
 user.username = req.body.username;
 user.password = req.body.password;

 user.save(function(err){
   if (err) {
     if (err.code == 11000) return res.json({success: false, message: 'A user with that user name already exists...'});
     else return res.send(err);
   }

   res.json({message: 'A user was created!'});
 });
});


// GET ALL USERS FROM DATABASE:
router.get('/api/users', function(req, res, next){
  User.find({}, function(err, users){
    if (err) res.send(err);
    res.json(users);
  });
});


// GET A SPECIFIC USER FROM DATABASE:
router.get('/api/users/:user_id', function(req, res, next){
  User.findById(req.params.user_id, function(err, user){
    if (err) res.send(err);
    res.json(user);
  });
});


// UPDATE A SPECIFIC USER IN DATABASE:
router.put('/api/users/:user_id', function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if (err) res.send(err);

    if (req.body.name) user.name = req.body.name;
    if (req.body.username) user.username = req.body.username;
    if (req.body.password) user.password = req.body.password;

    user.save(function(err) {
      if (err) res.send(err);
      res.json({message: "User has been updated!"});
    })

  });
});

// DELETE A SPECIFIC USER FROM DATABASE:
router.delete('/api/users/:user_id', function(req, res, next){
  User.remove({_id: req.params.user_id}, function(err, user){
    if (err) res.send(err);
    res.json({message: "User has been deleted."});
  });
});



// router.get(    '/resources/new',      resourcesController.new)
// router.get(    '/resources/:id',      resourcesController.show)
// router.get(    '/resources/:id/edit', resourcesController.edit)
// router.post(   '/resources',          resourcesController.create)
// router.put(    '/resources/:id',      resourcesController.update)
// router.delete( '/resources/:id',      resourcesController.destroy)

module.exports = router;
