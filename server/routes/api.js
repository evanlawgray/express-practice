const cors = require( 'cors' );
const db = require('../app');

module.exports = ( router ) => {

  console.log('DB IS!!!!!!!!!!!!:', db)

  router.use( cors({
    origin: ['http://localhost:3001'],
    credentials: true
  }));

  router.get( '/fish/saltwater', (req, res) => {
    res.json([
      { name: 'Tuna' },
      { name: 'Cod' }
    ])
  });

  router.get( '/fish/freshwater', (req, res) => {
    res.json([
      { name: 'Salmon' },
      { name: 'Catfish' }
    ])
  });

  router.get( '/posts/:lesson_id', (req, res) => {
    let lessonId = req.params.lesson_id;

    db.any(`SELECT * FROM posts WHERE posts.lesson_id = ${lessonId}`, [true])
      .then( ( posts ) => {
        return posts ?
          res.status( 200 ).json( posts ) :
          res.status( 403 ).send()
      })
      .catch( ( err ) => {
        return res.status( 500 ).send();
      })
  });

  return router;
}


