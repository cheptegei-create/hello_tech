const router = require('express').Router();

// basic home route
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { logged_in: req.session.logged_in })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/api/dashboard');
    return;
  }

  res.render('login');
});


module.exports = router;