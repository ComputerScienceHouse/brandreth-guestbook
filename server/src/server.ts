import express, { Router } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
// import passport from 'passport';
// import { Issuer, Strategy } from 'openid-client';
import session from 'express-session';
import { tripRouter, uploadRouter } from './routes';
import dbInit from './db/init';

dotenv.config();

const app = express();

void dbInit();

app.use(
  cors({
    optionsSuccessStatus: 204,
    origin: [
      'https://brandreth-guestbook.csh.rit.edu',
      'http://localhost:8080',
      'http://localhost:3000'
    ]
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'secret',
    saveUninitialized: true,
    resave: true
  })
);

// Issuer.discover('https://sso.csh.rit.edu/auth/realms/csh').then(issuer => {
//   const client = new issuer.Client({
//     client_id: process.env.AUTH_CLIENT_ID ?? 'client_id',
//     client_secret: process.env.AUTH_CLIENT_SECRET ?? 'secret',
//     redirect_uris: [process.env.AUTH_CALLBACK_URL ?? 'http://localhost:3000/auth/callback'],
//     response_types: ['code']
//   });

//   client.authorizationUrl({
//     scope: 'openid email profile',
//     resource: 'https://sso.csh.rit.edu/auth/realms/csh/protocol/openid-connect/auth'
//   });

//   app.use(passport.initialize());
//   app.use(passport.session());

//   passport.use(
//     'oidc',
//     new Strategy({ client }, (tokenSet: any, userinfo: any, done: any) => {
//       return done(null, tokenSet.claims());
//     })
//   );

//   passport.serializeUser((user, done) => done(null, user));
//   passport.deserializeUser((user: (Express.User | undefined), done) => done(null, user));
// });

// app.get('/authentication', (req, res, next) => {
//   passport.authenticate('oidc')(req, res, next);
// });

// app.get('/authentication/callback', (req, res, next) => {
//   passport.authenticate('oidc', {
//     failureRedirect: '/auth'
//   })(req, res, next);
// });

// const requireAuth = (req: Request, res: Response, next: () => void): void => {
//   if (req.user != null) {
//     next();
//   } else {
//     req.user = {
//       username: 'river',
//       name: 'River Marks',
//       role: 'POTTER_STEWARD'
//     };
//     next();
//     // res.redirect('/auth');
//   }
// };

const api = Router();

api.use('/trip', tripRouter);
api.use('/upload', uploadRouter);

app.use('/api', api);

// Place routes above this, it will be the catchall to direct to the client
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'dist')));
app.use(express.static(path.join(__dirname, '..', '..', 'client', 'public')));
app.use('*', (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'client', 'dist', 'index.html')
  );
});

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
