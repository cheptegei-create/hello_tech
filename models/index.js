const User = require('./User');
const Blog = require('./Blog');
const Comments = require('./Comments');

Blog.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Blog, {
  foreignKey: 'user_id'
})

Blog.hasMany(Comments, {
  foreignKey: 'user_id'
});

Comments.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Comments, {
  foreignKey: 'user_id'
})

module.exports = {
  User,
  Comments,
  Blog
};
