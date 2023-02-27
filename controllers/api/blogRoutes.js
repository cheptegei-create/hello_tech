const router = require("express").Router();
const { Blog } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, (req, res) => {
  /* posting a new blog */
  const body = req.body.body;
  const title = req.body.title;
  console.log(req.session.userId);
  Blog.create({ title, body, userId: req.session.userId })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", withAuth, (req, res) => {
  /* updating a blog on the dashboard list */
  Blog.update(
    {
      title: req.body.title,
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((affectedRows) => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.delete("/:id", withAuth, (req, res) => {
  /* Remove a blog from the list */
  Blog.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((affectedRows) => {
      if (affectedRows > 0) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
