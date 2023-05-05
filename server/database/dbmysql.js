const routes = require('../routes/router.js')


const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/api',  routes)
// app.use('/api/register',  routes)
// app.use('/api/login',  routes)

app.use(express.json());



const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
  } else {
    console.log('Connected to database!');
  }
});



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


