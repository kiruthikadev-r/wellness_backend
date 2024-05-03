
const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');


const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tag: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Post.sync()
  .then(() => {
    console.log('Post model synced with database successfully.');
  })
  .catch(err => {
    console.error('Error syncing Post model:', err);
  });

module.exports = Post;
