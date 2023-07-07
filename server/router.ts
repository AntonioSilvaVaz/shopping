const Router = require('@koa/router');
const router = new Router();

const UserController = require('./controllers/UserController');

router.post('/create_item', UserController.createNewUser);

module.exports = router;