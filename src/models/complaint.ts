import * as debug from 'debug';

const log = debug('duckbot.tf:models:complaint');

export default (sequelize, Sequelize) => {
    log('built complaint schema.');
    return sequelize.define('complaint', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        message: {
            type: Sequelize.STRING,
            len: [0, 64]
        },
        approved: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
}
