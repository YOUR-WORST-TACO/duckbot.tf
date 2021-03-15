import debug from 'debug';
import * as bcrypt from 'bcrypt';
import * as passport from 'koa-passport';
import {database as db} from '../resources';
import {Strategy as LocalStrategy} from 'passport-local'

export const init = () => {
    // @ts-ignore
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser( async (id, done) => {
        try {
            const user = await db.User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });

    passport.use( 'magic', new LocalStrategy({ usernameField: 'email'}, async (email, password, done) => {
        try {
            const user = await db.User.findOne({where: {email: email}})

            if (user && await bcrypt.compare(password, user.password)) {
                done(null, user.toJSON());
            } else {
                done(null, false, { message: 'Missing username and/or password.' });
            }
        } catch (err) {
            done(err);
        }
    }));
}
