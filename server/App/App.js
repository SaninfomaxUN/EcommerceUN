const routes = require('../Routes/Router.js')
const ConnectionDB = require('../Database/ConnectionDB.js')


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.use('/api',  routes)



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  ConnectionDB.testConnection()
});


