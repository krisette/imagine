import express, { Request, Response } from 'express';
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
  User.findOne()
    .then((user: any) => {
      if (user) {
        done(null, user);
      } else {
        const newUser = new User({
          username: displayName,
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

passport.serializeUser((user: any, done: any) => {
  process.nextTick(() => {
    done(null, user.id);
  });
});

passport.deserializeUser((id: string, done: any) => {
  process.nextTick(() => {
    User.findById(id, (err: any, user: any) => {
      done(err, user);
    });
  });
});

router.get('/login/federated/google', passport.authenticate('google', {
  scope: ['email', 'profile'],
}));

router.get('/oauth2/redirect/google', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

export default router;
