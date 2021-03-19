import * as Router from 'koa-router';
import {apeController} from '../controllers';

const router = new Router();

router.post('/newape', apeController.add);
router.post('/removeape', apeController.remove);

export default router;
