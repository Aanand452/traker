const config = {
  app: {
    name: 'Passport SAML strategy example',
    port: process.env.PORT || 3001
  },
  passport: {
    strategy: 'saml',
    saml: {
      path: process.env.SAML_PATH || '/login/callback',
      entryPoint: process.env.SAML_ENTRY_POINT || 'https://mgonzalez-dev-ed.my.salesforce.com/idp/login?app=0sp3g0000008OIU',
      issuer: 'sfdc-activity-tracker',
      cert: process.env.SAML_CERT || null
    }
  }
};

module.exports = {
  development: config,
  production: config
};
