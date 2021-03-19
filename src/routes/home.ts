import * as Router from 'koa-router';
import {database as db} from '../resources';

const router = new Router();

router.get('/', async(ctx, next) => {
    const tags = await db.Tag.findAll();
    // @ts-ignore
    await ctx.render('index', { title: 'Home', apeTags: tags});
})

export default router;
