const Router = require('@koa/router');
const router = new Router();

const ItemsController = require('./controllers/ItemsController');

router.get('/', ItemsController.getAllItems);

module.exports = router;