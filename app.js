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

app.use(cors({
  origin: ['http://localhost:3001'],
  credentials: true
}));

app.use( bodyParser.urlencoded({ extended: false }));
app.use( json() );

app.use(express.static( __dirname + '/public/build' ));

app.get( '/', (req, res) => {
  res.send( '/public/index.html' )
});

app.get( '/posts/:lesson_id', (req, res) => {
  let lessonId = req.params.lesson_id;

  db.query(`SELECT * FROM posts WHERE posts.lesson_id = ${lessonId}`, [true])
    .then( ( posts ) => {

      if ( posts ) {
        return res.status( 200 ).json( posts )
      } else {
        return res.status( 403 ).send()
      }

    })
    .catch( ( err ) => {
      console.log(err);
      return res.status( 500 ).send();
    })
});

const PORT = 3000;

app.listen( PORT, function() {
  console.log( 'App is listening on port 3000!!!!!!' )
});



