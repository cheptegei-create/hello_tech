const router = require('express').Router();
const { Blog, User, Comments } = require('../models');

// basic home route
router.get('/', async (req, res) => {
  try {
     // Get all blogs and JOIN with user data
     const blogData = await Blog.findAll({
      include: [
        {
          model: User,
        },
        {
          model: Comments,
        }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));


    res.render('homepage', { 
      blogs,
      logged_in: req.session.logged_in 
    })
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