import * as debug from 'debug';

const log = debug('duckbot.tf:models:ape');

export default (sequelize, Sequelize) => {
    log('built ape schema.');
    return sequelize.define('ape', {
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
    })
}
