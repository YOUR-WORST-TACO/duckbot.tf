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
router.get('/login/steam', passport.authenticate('steam'), (ctx) => {
    console.log(ctx.response);
    ctx.redirect('/');
})
router.get('/auth/steam/callback', passport.authenticate('steam'), (ctx) => {
    console.log(ctx.request.body);
    ctx.redirect('/');
})

router.get('/error', async (ctx) => {
    console.log(ctx.request.body)
    ctx.body = "error";
})

router.post('/register', authController.register);
router.post('/register/steam', authController.steamRegister);

export default router;
