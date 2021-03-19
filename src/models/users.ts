import * as debug from 'debug';

const log = debug('duckbot.tf:models:user');

export default (sequelize, Sequelize) => {
    log('built user schema.')
    let user = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        open_id: {
            type: Sequelize.STRING
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
    });

    user.findByOpenID = async (id, done) => {
        try {
            const foundUser = await user.findOne({where: {open_id: id}})
            done(null, foundUser);
        } catch (e) {
            done(e);
        }
    }

    return user;
}
