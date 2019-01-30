const express = require('express')
const app = express()
const dbConfig = require('./config/database_config');
const mongoose = require('mongoose');
const router = require('./routes/routes');
var bodyParser = require('body-parser');
let jwt = require('jsonwebtoken'); //added
const userModel = require('./app/models/user'); //added


var cors = require('cors');
const port = 3001;
connections = [];
app.use(cors());
// extended: true -> then you can parse nested objects
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//it will match any path that begins with '/'
app.use('/', router);

//added
app.get('/verifyEmail/:token', async (req, res) => {
    try {
        const { user: { id } } = jwt.verify(req.params.token, "secretkey");
        await userModel.update({ confirmed: true }, { where: { id } });
    } catch (e) {
        res.send('error');
    }

    return res.redirect('http://localhost:3000/login');
});



// Configuring the database(legacy code)
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true })
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
