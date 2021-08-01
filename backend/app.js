
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const postRoutes = require('./routes/post')
const userRoutes = require('./routes/user')





const app = express();


app.use(cors());


app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/auth', userRoutes)
app.use('/api/post', postRoutes)


module.exports = app