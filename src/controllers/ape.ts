import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as debug from 'debug';

import * as SteamAPI from 'steamapi';

const steam = new SteamAPI(config.steam.api)

const log = debug('duckbot.tf:controllers:ape');

export const add: Middleware = async (ctx) => {
    const steamurl = ctx.request.body.steamurl;
    const message = ctx.request.body.message;
    const flags = ctx.request.body.flags;

    if (!steamurl || !message || !flags) {
        ctx.status = 400;
        ctx.body = "need url, message, and flags"
    }

    try {
        const steam_id = await steam.resolve(steamurl)
        let ape = await db.Ape.findOne({where: {steam_id: steam_id}})
        if (!ape) {
            ape = await db.Ape.create({
                steam_id: steam_id
            })
        }

    } catch (err) {

    }
}
