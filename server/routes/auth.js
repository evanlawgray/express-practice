

module.exports = ( router ) => {

  router.use((req, res, next) => {

  });

  router.get( '/login', () => {
    res.json({ login: true });
  });

  router.get( '/logout', () => {
    res.json({ login: false });
  });

  router.get( '/secretfish', () => {
    res.json([
      { name: 'Krakken' }
    ])
  });

  return router;
}
