const express = require('express');
const { sequelize } = require('./sequelize');
const { Op } = require('sequelize');
const Post = require('./models/post');

const app = express();
app.use(express.json());


// app.get('/posts', async (req, res) => {
//   try {
//     const posts = await Post.findAll();
//     console.log(posts);
//     res.send(posts);
//   } catch (err) {
//     res.status(500).json({ error: 'Error fetching posts' });
//   }
// });

// Endpoint to get all posts with pagination, sorting, keyword, and tag filters
app.get('/posts', async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Sorting
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    // Keyword filter
    const keyword = req.query.keyword || '';

    // Tag filter
    const tag = req.query.tag || '';

    // Find all posts with filters
    const posts = await Post.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` },
        tag: { [Op.like]: `%${tag}%` }
      },
      order: [[sortBy, sortOrder]],
      limit,
      offset
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching posts' });
  }
});



app.post('/posts', async (req, res) => {
  const { title, desc, tag, imageUrl } = req.body
  // const title="jk"
  // const desc="jk"
  // const tag="jk"
  // const imageUrl="jk"
  // console.log( title, desc, tag, imageUrl);
  try {
    const newPost = await Post.create({ title, desc, tag, imageUrl });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

  app.listen(3303, () => {
    console.log('Server running on port 3303');
  });
