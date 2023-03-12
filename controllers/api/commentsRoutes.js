const router = require("express").Router();
const { Comments } = require("../../models/");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comments.create({ 
      body: req.body.body,
      user_id: req.session.user_id,
      blog_id: req.body.blog_id
    })

    
        res.status(200).json(commentData);
  } catch(err) {
      res.status(500).json(err);
    }
});

// Delete a comment (use withAuth middleware to authenticate access)
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteComment = await Comments.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a comment (use withAuth middleware to authenticate access)
router.put('/:id', withAuth, async (req, res) => {
  try {

    const updatedComment = req.body.updatedText;

    const updateComment = await Comments.update(
      {
        body: updatedComment
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(200).json(updateComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
