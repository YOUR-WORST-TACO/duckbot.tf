import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as debug from 'debug';

import * as SteamAPI from 'steamapi';

const steam = new SteamAPI(config.steam.api)

const log = debug('duckbot.tf:controllers:ape');

export const add: Middleware = async (ctx) => {
    console.log(ctx.request.body);
    const steamurl = ctx.request.body.steamurl;
    const message = ctx.request.body.message;
    const author = ctx.request.body.author || 'Anonymous'; // can be null
    const tags = ctx.request.body.tags;

    if (!steamurl || !message || !tags) {
        ctx.status = 400;
        ctx.body = "need url, message, and flags"
        return;
    }

    try {
        const steam_id = await steam.resolve(steamurl)
        let ape = await db.Ape.findOne({where: {steam_id: steam_id}})
        if (!ape) {
            ape = await db.Ape.create({
                steam_id: steam_id
            })
        }

        const complaint = await db.Complaint.create({
            message: message,
            author: author
        });

        ape.addComplaint(complaint);

        const db_tags = await db.Tag.findAll({
            where: {
                id: tags
            }
        });

        for (const tag of db_tags) {
            complaint.addTag(tag);
        }

    } catch (err) {
        console.log(err);
    }
}

export const testthing: Middleware = async (ctx) => {
    log(ctx.request.body);
}
