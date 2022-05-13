const config = {
  app: {
    name: "Passport SAML strategy example",
    port: process.env.PORT || 3001,
  },
  passport: {
    strategy: "saml",
    saml: {
      path: process.env.SAML_PATH ? process.env.SAML_PATH : "/login/callback",
      entryPoint: 'https://aloha.my.salesforce.com/idp/login?app=0sp0W000000sYK8',
      issuer: "Activity_tracker_qa",
      cert: process.env.SAML_CERT ? process.env.SAML_CERT : "null",
    },
  },
};

module.exports = {
  development: config,
  production: config,
};
