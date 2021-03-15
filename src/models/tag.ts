import * as debug from 'debug';

const log = debug('duckbot.tf:models:tag');

export default (sequelize, Sequelize) => {
    log('built tag schema.');
    return sequelize.define('tag', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            len: [0, 32]
        },
        description: {
            type: Sequelize.TEXT
        }
    })
}
