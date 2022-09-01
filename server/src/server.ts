import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';
import passport from 'passport';
import session from 'express-session';
import OIDCStrategy from 'passport-openidconnect';
import { tripRouter, uploadRouter } from './routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../client/dist')));
app.use(
  session({
    secret: process.env.SESSION_SECRET ?? 'secret',
    saveUninitialized: true,
    resave: true
  })
);

// TODO: Make this much better and not a shitton of anys
passport.use(
  new OIDCStrategy({
    issuer: 'https://sso.csh.rit.edu/auth/realms/csh',
    authorizationURL: 'https://sso.csh.rit.edu/auth/realms/csh/protocol/openid-connect/auth',
    tokenURL: 'https://sso.csh.rit.edu/auth/realms/csh/protocol/openid-connect/token',
    userInfoURL: 'https://sso.csh.rit.edu/auth/realms/csh/protocol/openid-connect/userinfo',
    clientID: process.env.AUTH_CLIENT_ID,
    clientSecret: process.env.AUTH_CLIENT_SECRET,
    callbackURL: process.env.AUTH_CALLBACK_URL
  },
  (_: any, __: any, profile: any, cb: (_: any, __: any) => any) => {
    return cb(null, profile);
  })
);

const userFunct = (user: any, cb: any): any => cb(null, user);
passport.serializeUser(userFunct);
passport.deserializeUser(userFunct);

app.use(passport.initialize());
app.use(passport.session());

const requireAuth = (req: Request, res: Response, next: () => void): void => {
  if (req.user != null) {
    next();
  } else {
    res.redirect('/auth');
  }
};

// TODO: End above

app.get(
  '/auth',
  passport.authenticate('openidconnect')
);

app.get(
  '/auth/callback',
  passport.authenticate('openidconnect', { failureRedirect: '/auth' }),
  (_, res) => res.redirect('/')
);

app.use('/trip', requireAuth, tripRouter);
app.use('/upload', requireAuth, uploadRouter);

// Place routes above this, it will be the catchall to direct to the client
app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});

const PORT = process.env.APP_PORT ?? 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`listening on port ${PORT}`);
});
