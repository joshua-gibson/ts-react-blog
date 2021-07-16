require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const app = express();
const port = 3000;
const privateKey  = fs.readFileSync('key.pem');
const certificate = fs.readFileSync('cert.pem');

const credentials = {key: privateKey, cert: certificate};
// session support is required to use ExpressOIDC
app.use(session({
    secret: process.env.RANDOM_SECRET_WORD,
    resave: true,
    saveUninitialized: false
}));

const oidc = new ExpressOIDC({
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URL,
    scope: 'openid profile',
    routes: {
        callback: {
            path: '/authorization-code/callback',
            defaultRedirect: '/admin'
        }
    }
});

// ExpressOIDC will attach handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);
app.use(cors());
app.use(bodyParser.json());

app.get('/home', (req, res) => {
    res.send('<h1>Welcome!!</div><a href="/login">Login</a>');
   });
   
   app.get('/admin', oidc.ensureAuthenticated(), (req, res) =>{
    res.send('Admin page');
  })
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/home');
  });
  
  app.get('/', (req, res) => {
    res.redirect('/home');
  });

  var httpsServer = https.createServer(credentials, app);

  httpsServer.listen(port, () => console.log(`My Blog App listening on port ${port}!`))