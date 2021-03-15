import * as debug from 'debug';

const log = debug('duckbot.tf:models:user');

export default (sequelize, Sequelize) => {
    log('built user schema.')
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [0, 64]
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            len: [0, 128]
        },
        verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    })
}
