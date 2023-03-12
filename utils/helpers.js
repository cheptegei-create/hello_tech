module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
    },
    // Sees if the user is the owner of a comment (the one who commented it so that they can then edit/delete that comment)
  is_user: (comment_user_id, user_id) => {
    if (comment_user_id === user_id) {
      return true;
    }
  },
  };
  