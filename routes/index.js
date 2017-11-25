const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controllers/userController');
const { ensureAuthentication } = require('../handlers/authHandlers');

router.get('/', userController.getIndex);
router.get('/login', userController.getLogin);
router.get('/account', ensureAuthentication, userController.getAccount);
router.get('/logout', userController.logout);

// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  userController.redirectIndex
);

module.exports = router;
