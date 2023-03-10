const router = require('express').Router();
const { Blog, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const blogData = await Blog.findAll({
        where: {
          user_id: req.session.user_id
        },
        include: [
          {
            model: User
          },
        ],
      });
  
      // Serialize data so the template can read it
      const blogs = blogData.map((blog) => blog.get({ plain: true }));

      console.log(blogs)
  
      // Pass serialized data and session flag into template
      res.render('dashboard', { 
        blogs, 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  router.get('/:id', withAuth, async (req, res) => {
    try {
      const blogData = await Blog.findByPk(req.params.id, {
        include: [
          {
            model: User
          },
        ],
      });
  
      const blog = blogData.get({ plain: true });
  
      res.render('blog', {
        ...blog,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.put("/:id", withAuth, async (req, res) => {
  /* updating a blog on the dashboard list */
    try {
      const blogData = await Blog.update({
        // we are deleting the usermanufacturer relationship which has the id associated with the manufacturer we clicked to delete which is also associated with our user who is signed in
          title: req.body.title,
          body: req.body.body,
        },
        {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      })
  
      if (!blogData) {
        res.status(404).json({ message: 'No post was found with this id.' })
        return
      }
  
      res.status(200).json(blogData)
    } catch (err) {
      res.status(500).json(err)
    }
});

router.delete("/:id", withAuth, async (req, res) => {
  /* Remove a blog from the list */
    try {
      const blogData = await Blog.destroy({
        // we are deleting the usermanufacturer relationship which has the id associated with the manufacturer we clicked to delete which is also associated with our user who is signed in
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      })
  
      if (!blogData) {
        res.status(404).json({ message: 'No post was found with this id.' })
        return
      }
  
      res.status(200).json(blogData)
    } catch (err) {
      res.status(500).json(err)
    }
});

  module.exports = router;