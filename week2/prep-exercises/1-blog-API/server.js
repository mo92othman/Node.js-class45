const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;
  const filePath = path.join(__dirname, `${title}.txt`);

  try {
    fs.writeFileSync(filePath, content);
    res.send('ok');
  } catch (error) {
    res.status(500).send('Failed to create the post');
  }
});

app.put('/posts/:title', (req, res) => {
  const { content } = req.body;
  const title = req.params.title;
  const filePath = path.join(__dirname, `${title}.txt`);

  if (fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.delete('/blogs/:title', (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, `${title}.txt`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  const title = req.params.title;
  const filePath = path.join(__dirname, `${title}.txt`);

  try {
    if (fs.existsSync(filePath)) {
      const post = fs.readFileSync(filePath);
      res.status(200).end(post);
    } else {
      res.status(404).send('This post does not exist!');
    }
  } catch (error) {
    res.status(500).send('Error reading the post');
  }
});

app.get('/blogs', (req, res) => {
  const posts = fs.readdirSync(__dirname);
  const txtFiles = posts.filter((file) => file.endsWith('.txt'));

  if (txtFiles.length > 0) {
    const postTitles = txtFiles.map((file) => ({
      title: file.replace('.txt', ''),
    }));
    res.status(200).json(postTitles);
  } else {
    res.status(200).json({ message: 'No posts found' });
  }
});

app.listen(3000);
