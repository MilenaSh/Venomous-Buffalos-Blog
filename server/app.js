const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//temporary setup with mongoose
mongoose.connect(config.database);

// Confirms we are connected
mongoose.connection.on('connected', () => {
    console.log(`Connected to ${config.database}`);
});

//On error
mongoose.connection.on('error', (err) => {
    console.log(`Database error ${err}`);
});

const app = express();

const users = require('./routes/users');
const posts = require('./routes/posts');
const searches = require('./routes/searches');

// To use locally
const port = process.env.PORT || 3000;

// For deploy
// const port = process.env.PORT || 8080;

// Set static folder where will be the client side
app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.json());
app.use(cookieParser());

// cors enables us to run the app on 2 different ports
// app.use(cors());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization');
    next();
});

// Passpot

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/posts', posts);
app.use('/search', searches)

// // every route coming from users will be looked for in this file.

// app.use('/users', users);

app.get('/', (req, res) => {
    console.log("3000 root");
    res.send('Invalid Endpoint');
});

// TO BE USED for same port - replacing app.get('/',
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.listen(port, () => {
    console.log(`Magic happens on port ${port}`);
})
