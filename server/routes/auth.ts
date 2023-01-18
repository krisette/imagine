import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import dotenv from 'dotenv';
import { User } from '../models';

const router = express.Router();
dotenv.config();

// passport config
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/oauth2/redirect/google',
  passReqToCallback: true,
}, (req: Request, accessToken: string, refreshToken: string, profile: any, done: any) => {
  const { id, displayName, emails } = profile;
  const email = emails[0].value;
  User.findOne({ email })
    .then((user: any) => {
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          username: displayName,
          password: 'google',
          email,
          oauth: [{
            provider_name: 'google',
            provider_id: id,
            provider_data: profile,
          }],
        });
        newUser.save()
          .then((newUser: any) => {
            done(null, newUser);
          });
      }
    });
}));

passport.serializeUser((user: any, cb: any) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username, name: user.name });
  });
});

passport.deserializeUser((user: any, cb: any) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

router.get('/login/federated/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: 'http://localhost:8080',
  failureRedirect: '/login',
}));

router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout((err: any) => {
    if (err) {
      return next(err);
    }
    return res.redirect('http://localhost:8080');
  });
});

router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

export default router;
