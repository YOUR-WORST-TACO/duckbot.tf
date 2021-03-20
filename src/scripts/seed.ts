import * as debug from 'debug';
import * as sentencer from 'sentencer';

import {database as db, passport as pass} from '../resources';
import {steamInstance} from "../helpers";

const log = debug('duckbot.tf:scripts:seed');

const seed = async () => {
    await db.sequelize.sync();
    log('attempting to seed database');
    try {
        log( "creating tags" );

        await db.Tag.findOrCreate({where: {name: 'Ape'}, defaults: {
            description: "Incompentent at the game."
            }})
        await db.Tag.findOrCreate({where: {name: 'Gas'}, defaults: {
                description: "Uses gas passer like a chad."
            }})
        await db.Tag.findOrCreate({where: {name: 'Private Profile'}, defaults: {
                description: "Fears comments and snooping, coward."
            }})
        await db.Tag.findOrCreate({where: {name: 'Pyro'}, defaults: {
                description: "Plays pyro, probably dies a lot."
            }})
        await db.Tag.findOrCreate({where: {name: 'Idle'}, defaults: {
                description: "Incredibly useful to the team, does nothing."
            }})
        await db.Tag.findOrCreate({where: {name: 'Mouth Breather'}, defaults: {
                description: "Steals my precious oxygen."
            }})

        log('seed apes');
        const apes = [
            'https://steamcommunity.com/profiles/76561198154726694/',
            'https://steamcommunity.com/id/andarlif/',
            'https://steamcommunity.com/profiles/76561198099662062/',
            'https://steamcommunity.com/profiles/76561198108795706/',
            'https://steamcommunity.com/id/GinIsWoke/',
            'https://steamcommunity.com/id/ColonnelloJohnson/',
            'https://steamcommunity.com/id/xxxbloodrainxxx/',
            'https://steamcommunity.com/profiles/76561198154116987'
        ];

        for await (const ape of apes) {
            const steam_id = await steamInstance.resolve(ape);
            await db.Ape.findOrCreate(steam_id, ape);
        }

        log('add tags to ape');

        let dbApes = await db.Ape.findAll();
        let dbTags = await db.Tag.findAll();

        let tag_pos = 0;
        for await (const ape of dbApes) {
            for (let i = 0; i < 3; i++) {
                await ape.addTag(dbTags[i]);
                tag_pos++;
                if (tag_pos > dbTags.length) {
                    tag_pos = 0;
                }
            }
        }

        log('generate random comments on user');

        for await (const ape of dbApes) {
            const complaint1 = await db.Complaint.create({
                message: sentencer.make("This player is {{ a_noun }} and they are {{ adjective }}."),
                author: 'Taco'
            });

            const complaint2 = await db.Complaint.create({
                message: sentencer.make("This player is {{ an_adjective }} who thinks like {{ a_noun }}."),
                author: 'Taco'
            });

            const complaint3 = await db.Complaint.create({
                message: sentencer.make("They cause {{ nouns }} to suffer in {{ adjective }} agony."),
                author: 'Taco'
            });

            await ape.addComplaint(complaint1);
            await ape.addComplaint(complaint2);
            await ape.addComplaint(complaint3);
        }

        log('successfully seeded database')
    } catch (e) {
        log(e)
    }
}
seed().catch( (err) => {
    log('failed to seed: %s', err);
})
