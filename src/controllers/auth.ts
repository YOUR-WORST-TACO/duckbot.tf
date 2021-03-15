import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as bcrypt from 'bcrypt';
import * as debug from 'debug';

const log = debug('duckbot.tf:controllers:auth');

export const loginPage: Middleware = async (ctx) => {
    if (await ctx.isAuthenticated()) {
        ctx.redirect('/')
        return;
    }

    log('flash %s', ctx.flash);
    await ctx.render('login', {title: 'Login', message: ctx.flash('error')});
}

export const logout: Middleware = async (ctx) => {
    ctx.logout();
    ctx.redirect('/');
}

export const register: Middleware = async (ctx) => {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;

    if (!email || !password) {
        ctx.status = 400;
        ctx.body = "Email or password missing.";
        return;
    }

    let user = await db.User.findOne({ where: {email: email }});

    if (user) {
        ctx.status = 400;
        ctx.body = "That email is already in use.";
        return;
    }

    const passwordHash = await bcrypt.hash(password, config.crypto.salt);

    user = await db.User.create({
        email: email,
        password: passwordHash
    });

    ctx.body = "successfully registered user";
}
