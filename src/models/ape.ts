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
        avatar: {
            type: Sequelize.TEXT,
        },
        nickname: {
            type: Sequelize.TEXT,
        }
    })
}
