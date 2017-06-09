const express = require('express');
const pgp = require('pg-promise')({});
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const json = require('body-parser').json;


const db = pgp({
  user: 'owner',
  password: 'Atarax1a309',
  database: 'practice',
  port: '5432',
  host: 'localhost'
});

module.exports = db;

// Makes sure that cors headers are only applied when the server
// is running in a development environment

// process.env.NODE_ENV === 'development' && app.use( cors({
//   origin: 'http://localhost:3001',
//   credentials: true
// }));

app.use(express.static( __dirname + '/public/build' ));

app.get( '/', (req, res) => {

  console.log('getting react app');

  res.send( './public/build' );
});

const apiRouter = express.Router();
const authRouter = express.Router();

const apiRoutes = require( './routes/api' );
const authRoutes = require( './routes/auth' );

app.use( json() );
app.use( bodyParser.urlencoded({ extended: false }));

app.use( '/api', apiRoutes( apiRouter ));
app.use( '/auth', authRoutes( authRouter ));

const PORT = 3000;

app.listen( PORT, err => {
  err && console.log(err);

  console.log( 'App is listening on port 3000!!!!!!' )
});

