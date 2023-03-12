const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Blog.hasMany(Comments, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(User, {
  foreignKey: 'commenter_id'
});

Comments.belongsTo(Blog, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comments, {
  foreignKey: 'user_id',
});

module.exports = {
  User,
  Comments,
  Blog
};
