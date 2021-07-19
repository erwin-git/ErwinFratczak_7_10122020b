
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')
const commentRoutes = require('./routes/comment')
const likeRoutes = require('./routes/like')



const app = express();


app.use(cors());


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/post/:id', commentRoutes)
app.use('/api/post/:id', likeRoutes)




module.exports = app