const config = {
  app: {
    name: 'Passport SAML strategy example',
    port: process.env.PORT || 3000
  },
  passport: {
    strategy: 'saml',
    saml: {
      path: process.env.SAML_PATH || '/login/callback',
      entryPoint: process.env.SAML_ENTRY_POINT || 'https://appexchange--javier.cs3.my.salesforce.com/idp/login?app=0spQ00000004CPL',
      issuer: 'wwpricelist',
      cert: process.env.SAML_CERT || null
    }
  }
};

module.exports = {
  development: config,
  production: config
};
