const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const userRoutes = require('./routes/users')

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

});
app.use('/users', userRoutes)

mongoose.connect(
    'mongodb://localhost:27017/nodejs_demo'
).then(result => {
    app.listen(8080)
})
.catch(err => console.log(err))
app.listen(process.env.PORT || 5000);