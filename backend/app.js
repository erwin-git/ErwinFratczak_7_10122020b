
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');


const app = express()


app.use(cors());






const userRoutes = require('./routes/user')



app.use(bodyParser.json())


app.use('/api/auth', userRoutes)



module.exports = app