import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as debug from 'debug';

import * as SteamAPI from 'steamapi';
import * as ape_utils from "../helpers/ape_utils";

const steam = new SteamAPI(config.steam.api)

const log = debug('duckbot.tf:controllers:ape');

export const add: Middleware = async (ctx) => {
    console.log(ctx.request.body);
    const steamurl = ctx.request.body.steamurl;
    const message = ctx.request.body.message;
    const author = ctx.request.body.author || 'Anonymous'; // can be null
    const tags = ctx.request.body.tags;

    const transaction = await db.sequelize.transaction();

    if (!steamurl || !message || !tags) {
        ctx.status = 400;
        ctx.body = "need url, message, and flags"
        return;
    }

    try {
        const steam_id = await steam.resolve(steamurl)

        const user_info = await steam.getUserSummary(steam_id);

        let ape = await db.Ape.findOne({where: {steam_id: steam_id}})
        if (!ape) {
            ape = await db.Ape.build({
                steam_id: steam_id,
                steam_url: steamurl
            }, { transaction: transaction });
        }

        ape.avatar = user_info.avatar.large;
        ape.nickname = user_info.nickname;

        const tours = await ape_utils.getUserInfo(steam_id);

        ape.tour_two_cities = tours.two_cities;
        ape.tour_gear_grinder = tours.gear_grinder;
        ape.tour_steel_trap = tours.steel_trap;
        ape.tour_mecha_engine = tours.mecha_engine;
        ape.tour_oil_spill = tours.oil_spill;

        ape.save({transaction: transaction});

        const complaint = await db.Complaint.create({
            message: message,
            author: author
        }, { transaction: transaction });

        ape.addComplaint(complaint, { transaction: transaction });

        const db_tags = await db.Tag.findAll({
            where: {
                id: tags
            }
        });

        for (const tag of db_tags) {
            complaint.addTag(tag, { transaction: transaction });
        }

        await transaction.commit();

        ctx.body = "added new complaint";
    } catch (err) {
        console.log(err);
        await transaction.rollback();
    }
}

export const testthing: Middleware = async (ctx) => {
    log(ctx.request.body);
}
