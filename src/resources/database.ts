import * as debug from 'debug';
import * as Sequelize from 'sequelize';
import {apeSchema, userSchema, tagSchema} from "../models";

import config from '../config';
const database = config.database;

const log = debug('duckbot.tf:resources:database');

// @ts-ignore
const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    dialect: database.dialect,
    pool: {
        max: database.pool.max,
        min: database.pool.min,
        acquire: database.pool.min,
        idle: database.pool.idle
    }
})

const User = userSchema(sequelize, Sequelize);
const Ape = apeSchema(sequelize, Sequelize);
const Tag = tagSchema(sequelize, Sequelize);

export default {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    Ape: Ape,
    Tag: Tag
};
