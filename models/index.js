const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

Blog.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Blog.hasMany(Comments, {
  foreignKey: 'blogId',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Comments,
  Blog
};
