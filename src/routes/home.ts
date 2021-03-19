import * as Router from 'koa-router';
import {database as db} from '../resources';

const router = new Router();

router.get('/', async(ctx, next) => {
    const tags = await db.Tag.findAll();
    for (const tag of tags) {
        console.log(tag);
    }
    await ctx.render('index', { title: 'Home', apeTags: tags});
})

export default router;
