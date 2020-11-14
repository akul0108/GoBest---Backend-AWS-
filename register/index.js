require('./config/config');
require('./models/db');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var rtsIndex = require('./routes/routes');

var app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());


app.use('/api', rtsIndex);

//Start Server
app.listen(process.env.PORT, () => console.log(`server started at port: ${process.env.PORT}`));