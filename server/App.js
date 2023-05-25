const routes = require('./Routes/Router.js')
const ConnectionDB = require('./Database/ConnectionDB.js')


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin:['http://localhost:3000','http://127.0.0.1:3000'],
  credentials:true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/*app.use(cors({ origin: true }));*/
app.use(express.json());


app.use('/api',  routes)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "http://localhost:3000");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});
app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  ConnectionDB.testConnection()
});


