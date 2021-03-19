import * as Koa from 'koa';
import * as session from 'koa-session';
import * as debug from 'debug';
import * as helmet from 'koa-helmet';
import * as koaBody from 'koa-body';
import * as render from 'koa-ejs';
import * as passport from 'koa-passport';
import * as flash from 'koa-better-flash';
import * as serve from 'koa-static';

import {database as db, passport as pass} from './resources';
import config from './config';
import * as path from "path";
import * as routes from './routes';

const log = debug('duckbot.tf');
const app = new Koa();

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'template',
    viewExt: 'ejs',
    cache: false,
    debug: false
});

app.keys = ['magicalkey'];
app.use(session({
    key: 'koa.sess',
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: false, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null,
}, app));

app.use(serve(path.join(__dirname, '..', 'public')));

app.use(helmet());
app.use(koaBody());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

for (const routeKey of Object.keys(routes)) {
    app.use(routes[routeKey].routes());
}

const init = async () => {
    await db.sequelize.sync()
    pass.init();

    app.listen(config.server.port, () => {
        log('duckbot.tf started at %s:%s', config.server.host, config.server.port);
    })
}

init().catch((err) => {
    log('duck failed to give it the power: %s', err);
});
