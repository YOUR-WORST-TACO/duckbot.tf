import * as Router from 'koa-router';
import {authController} from '../controllers';
import * as passport from "koa-passport";

const router = new Router();

router.get('/login', authController.loginPage);
router.get('/logout', authController.logout);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));
router.post('/register', authController.register);

export default router;
