import {Middleware} from "koa";
import {database as db} from '../resources';
import config from '../config';
import * as debug from 'debug';
import {apeUtils, steamInstance} from '../helpers';

const log = debug('duckbot.tf:controllers:complaint');

// TODO get
export const get: Middleware = async (ctx) => {

}

export const add: Middleware = async (ctx) => {

}

// TODO implement remove
export const remove: Middleware = async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = "not allowed";
        return;
    }
    const complaint_id = ctx.request.body.complaint_id;

}

// TODO implement approve
export const approve: Middleware = async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.status = 401;
        ctx.body = "not allowed";
        return;
    }
    const complaint_id = ctx.request.body.complaint_id;

}
