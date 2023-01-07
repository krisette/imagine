import express, { Request, Response } from 'express';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

const router = express.Router();

router.get('/login', (req: Request, res: Response) => {
  res.render('login');
});

export default router;
