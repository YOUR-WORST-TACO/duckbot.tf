import * as Koa from 'koa';
import * as json from 'koa-json';
import * as debug from 'debug';
import * as helmet from 'koa-helmet';
import * as koaBody from 'koa-body';

import {database as db} from './resources';
import config from './config';

const log = debug('duckbot.tf');
const app = new Koa();

app.use(helmet());
app.use(json());
app.use(koaBody());

const init = async () => {
    await db.sequelize.sync()

    app.listen(config.server.port, () => {
        log('duckbot.tf started at %s:%s', config.server.host, config.server.port);
    })
}

init().catch((err) => {
    log('duck failed to give it the power: %s', err);
});
