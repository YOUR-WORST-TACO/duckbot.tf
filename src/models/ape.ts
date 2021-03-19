import * as debug from 'debug';
import {apeUtils, steamInstance} from "../helpers";
import {database as db} from "../resources";

const log = debug('duckbot.tf:models:ape');

export default (sequelize, Sequelize) => {
    log('built ape schema.');
    let ape = sequelize.define('ape', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        steam_id: {
            type: Sequelize.STRING,
            len: [0, 64]
        },
        steam_url: {
            type: Sequelize.TEXT
        },
        avatar: {
            type: Sequelize.TEXT,
        },
        nickname: {
            type: Sequelize.TEXT,
        },
        tour_two_cities: {
            type: Sequelize.INTEGER
        },
        tour_gear_grinder: {
            type: Sequelize.INTEGER
        },
        tour_steel_trap: {
            type: Sequelize.INTEGER
        },
        tour_mecha_engine: {
            type: Sequelize.INTEGER
        },
        tour_oil_spill: {
            type: Sequelize.INTEGER
        }
    });

    ape.findOrCreate = async (steam_id, steam_url, options) => {

        if (!options) {
            options = {};
        }

        const user_info = await steamInstance.getUserSummary(steam_id);

        let newApe = await ape.findOne({where: {steam_id: steam_id}})
        if (!newApe) {
            newApe = await ape.build({
                steam_id: steam_id,
                steam_url: steam_url
            }, options);
        }

        newApe.avatar = user_info.avatar.large;
        newApe.nickname = user_info.nickname;

        const tours = await apeUtils.getUserInfo(steam_id);

        // only add tour count updates if it succeeded
        if (tours) {
            newApe.tour_two_cities = tours.two_cities;
            newApe.tour_gear_grinder = tours.gear_grinder;
            newApe.tour_steel_trap = tours.steel_trap;
            newApe.tour_mecha_engine = tours.mecha_engine;
            newApe.tour_oil_spill = tours.oil_spill;
        }

        await newApe.save(options);

        return newApe;
    }

    return ape;
}


