const path = require("path");
const fetch = require("node-fetch");

const HOME_URL = "/";
const LOGIN_URL = "/login";
const LOGOUT_URL = "/logout";
const INDEX_FILE = path.resolve(__dirname, "../../build/index.html");
const ERROR_403 = path.resolve(__dirname, "../static/forbidden.html");
const DEFAULT_DOMAIN = ".dev-2-sfdc-activity-tracker.herokuapp.com";
const ENV_UPLOAD_WHITELIST = process.env.UPLOAD_WHITELIST || "";
const UPLOAD_WHITELIST = ENV_UPLOAD_WHITELIST.split(",") || [];
const APP_LOCKED = process.env.APP_LOCKED || "";
const APP_LOCKED_ALLOWED_USERS = APP_LOCKED.split(",") || [];

module.exports = function (app, config, passport) {
  const isAuthenticated = async (req, res, next) => {
    if (req.isAuthenticated()) {
      res.cookie("user", JSON.stringify(req.user || ""), {
        domain: process.env.APP_DOMAIN || DEFAULT_DOMAIN,
      });

      var apiEnpoint = process.env.API
        ? process.env.API + "/login"
        : "http://localhost:3000/api/v1/login";

      try {
        const request = await fetch(apiEnpoint, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            username: req.user.email,
            password: process.env.AUTH_KEY,
          }),
        });
        const response = await request.json();

        if (response.result.userId) {
          res.cookie("userid", JSON.stringify(response.result.userId));
          res.cookie("userName", JSON.stringify(response.result.name));
          res.cookie("username", JSON.stringify(response.result.name));
          res.cookie("userEmail", JSON.stringify(response.result.username));
          res.cookie("role", JSON.stringify(response.result.role || "user"));
          res.cookie("token", JSON.stringify(response.result.token));
          next();
        } else {
          show403Error(req, res);
        }
      } catch (err) {
        console.error(err);
        show403Error(req, res);
      }
    } else {
      res.redirect(LOGIN_URL);
    }
  };

  const goToApp = (req, res) => {
    res.sendFile(INDEX_FILE);
  };

  const show403Error = (req, res) => {
    res.status(403).sendFile(ERROR_403);
  };

  const isUploadAllowed = (email) => {
    return UPLOAD_WHITELIST.includes(email);
  };

  const isAppLocked = () => {
    return APP_LOCKED !== "";
  };

  const isUserAllowed = (req, res, next) => {
    const email = req.user ? req.user.email : "";

    if (isAppLocked()) {
      if (APP_LOCKED_ALLOWED_USERS.includes(email)) {
        next();
      } else {
        show403Error(req, res);
      }
    } else {
      next();
    }
  };

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  app.get(
    LOGIN_URL,
    passport.authenticate(config.passport.strategy, {
      successRedirect: HOME_URL,
      failureRedirect: LOGIN_URL,
    })
  );

  app.get(LOGOUT_URL, (req, res) => {
    res.clearCookie("userid");
    res.clearCookie("user");
    res.clearCookie("connect.sid");
    res.clearCookie("userName");
    res.clearCookie("role");
    res.clearCookie("token");
    // 'https://aloha.force.com/'
    res.redirect(
      process.env.LOGOUT_URL ||
        "https://mgonzalez-dev-ed.lightning.force.com/secur/logout.jsp"
    );
  });

  app.post(
    config.passport.saml.path,
    passport.authenticate(config.passport.strategy, {
      failureRedirect: HOME_URL,
      failureFlash: true,
    }),
    function (req, res) {
      res.redirect(HOME_URL);
    }
  );

  app.get("/config", (req, res) => {
    res.send({
      tablaeu: process.env.TABLAEU || "/",
      api: process.env.API || "http://localhost:3000",
      activitiesDate: process.env.ACTIVITIES_DATE,
      programsFYstartDate: process.env.PROGRAMS_FY_START_DATE,
      programsFYendDate: process.env.PROGRAMS_FY_END_DATE,
    });
  });

  const authMiddlewares = [];
  if (process.env.SSO === "true") {
    authMiddlewares.push(isAuthenticated, isUserAllowed);
  }

  app.get("/*", ...authMiddlewares, (req, res) => {
    goToApp(req, res);
  });
};
