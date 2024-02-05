const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`);

app.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

app.use(express.static('styles'));
app.use(express.urlencoded({ extended: false }));

app.post('/add-post', (req, res) => {
    const { title, author, text } = req.body;
    const post = {
        id: new Date(),
        date: (new Date()).toLocaleDateString(),
        title, 
        author, 
        text
    }
    res.render(createPath('post'), { title, post });
})

app.get('/', (req, res) => {
  const title = 'Home';
  res.render(createPath('index'), { title });
});

app.get('/contacts', (req, res) => {
  const title = 'Contacts';
  const contacts = [,
    { name: 'GitHub', link: 'https://github.com/hirenkiakuu' },
    { name: 'LeetCode', link: 'https://leetcode.com/hirenkiakuu/'}
  ];
  res.render(createPath('contacts'), { contacts, title });
});

app.get('/posts/:id', (req, res) => {
  const title = 'Post';
  const post = {
    id: '1',
    text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
    title: 'Post title',
    date: '05.05.2021',
    author: 'hirenkiaku'
  };
  res.render(createPath('post'), { title, post });
});

app.get('/posts', (req, res) => {
  const title = 'Posts';
  const posts = [
    {
        id: '1',
        text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
        title: 'Post title',
        date: '05.05.2021',
        author: 'hirenkiaku'
    },
    {
        id: '2',
        text: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsumLorem ipsum Lorem ipsum',
        title: 'Post title',
        date: '05.05.2021',
        author: 'hirenkiaku'
    },
  ];
  res.render(createPath('posts'), { title, posts });
});

app.get('/add-post', (req, res) => {
  const title = 'Add Post';
  res.render(createPath('add-post'), { title });
});

app.use((req, res) => {
  const title = 'Error Page';
  res
    .status(404)
    .render(createPath('error'), { title });
});