const router = require("express").Router();
const { User, Blog } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findOne(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  /* posting a new blog */
  try {
    let body = req.body.body;
    let title = req.body.title;
    console.log(req.session.userId);
    const blogData = await Blog.create({
      title,
      body,
      userId: req.session.userId,
    });

    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
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
