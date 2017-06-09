const token = require( 'jsonwebtoken' );
const cors = require( 'cors' );

module.exports = ( router ) => {

  router.use( cors({
    origin: ['http://localhost:3001'],
    credentials: true
  }));

  router.get( '/login', (req, res) => {
    res.json({ login: true });

    const session = {
      user: 'some_guy'
    }

    const JWT = token.sign(session, 'aslkdjfklajds-kasdjlk', {expiresIn: '2hr'});
    res.status( 200 ).cookie(
      'myCookie', JWT, {
        secure: false,
        maxAge: 7200000,
        httpOnly: true
      }
    ).send('You\'ve been logged in!');
  });

  router.get( '/logout', (req, res) => {
    res.json({ login: false });
  });

  router.get( '/secretfish', ( req, res ) => {

    if( !req.cookie ) {
      res.redirect('/auth/denied')
    } else {
      res.json([
      { name: 'Krakken' }
    ])
    }
  });

  router.get( '/denied', ( req, res ) => {
    console.log('You\'re request for secretfish has been denied');
    res.status( 403 ).send( 'You\'re request for secret fish information has been denied' );
  })

  return router;
}
