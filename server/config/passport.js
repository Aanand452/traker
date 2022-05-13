const SamlStrategy = require('passport-saml').Strategy;

module.exports = function (passport, config) {
  console.log('passport this is called');

  passport.serializeUser(function (user, done) {
    console.log('serialize user called');
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    console.log('deserialize user called');
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert,
      authnRequestBinding: 'HTTP-POST'
    },
    function (profile, done) {
      console.log('passport use called');
      console.log(profile.email);
      return done(null,
        {
          id: profile.uid,
          email: profile.email,
          displayName: profile.cn,
          firstName: profile.givenName,
          lastName: profile.sn
        });
    })
  );

};
