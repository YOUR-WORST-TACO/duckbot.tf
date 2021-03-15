import * as debug from 'debug';
import * as Sequelize from 'sequelize';
import {apeSchema, userSchema, tagSchema, complaintSchema} from "../models";

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
const Complaint = complaintSchema(sequelize, Sequelize);

Ape.hasMany(Complaint, {as: 'complaints'});
Complaint.belongsTo(Ape, {as: 'ape'});

Complaint.belongsToMany(Tag, {through: 'complaint_tag'});
Tag.belongsToMany(Complaint, {through: 'complaint_tag'});

export default {
    Sequelize: Sequelize,
    sequelize: sequelize,
    User: User,
    Ape: Ape,
    Tag: Tag,
    Complaint: Complaint
};
