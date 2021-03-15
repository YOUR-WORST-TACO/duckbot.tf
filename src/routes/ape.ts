import * as Router from 'koa-router';
import {apeController} from '../controllers';
import * as passport from "koa-passport";

const router = new Router();

router.post('/newape', apeController.add);

export default router;