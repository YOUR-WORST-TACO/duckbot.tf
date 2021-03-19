import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as debug from 'debug';
import {apeUtils, steamInstance} from "../helpers";

const log = debug('duckbot.tf:controllers:ape');

// TODO decide if needed
export const add: Middleware = async (ctx) => {
    const steamurl = ctx.request.body.steamurl;
    const message = ctx.request.body.message;
    const author = ctx.request.body.author || 'Anonymous'; // can be null
    const tags = ctx.request.body.tags;

    log('attempting to add new complaint');

    const transaction = await db.sequelize.transaction();

    if (!steamurl || !message || !tags) {
        ctx.status = 400;
        ctx.body = "need url, message, and flags"
        return;
    }

    if (!steamurl.includes('https://steamcommunity.com/id/') && !steamurl.includes('https://steamcommunity.com/profiles/')) {
        ctx.status = 400;
        ctx.body = "invalid steamurl";
        return;
    }

    try {
        const steam_id = await steamInstance.resolve(steamurl)

        let ape = await db.Ape.findOrCreate(steam_id, steamurl, { transaction: transaction });

        const complaint = await db.Complaint.create({
            message: message,
            author: author
        }, { transaction: transaction });

        await ape.addComplaint(complaint, { transaction: transaction });

        const db_tags = await db.Tag.findAll({
            where: {
                id: tags
            }
        });

        for await (const tag of db_tags) {
            await ape.addTag(tag, { transaction: transaction });
        }

        await transaction.commit();

        log('successfully added new complaint: %s', message);
        ctx.body = "added new complaint";
    } catch (err) {
        console.log("FUCK IU")
        console.log(err);
        await transaction.rollback();
        log('an error occurred');
        ctx.body = "some sort of error occurred";
    }
}

// TODO remove ape
export const remove = async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = "not allowed";
    }
}
