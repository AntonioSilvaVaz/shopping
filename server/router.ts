const Router = require('@koa/router');
const router = new Router();

const UserController = require('./controllers/UserController');

// USER ROUTES
router.post('/create_user', UserController.createNewUser);
router.post('/login', UserController.loginUser);

router.put('/update_user', UserController.updatedAnUser);
router.delete('/delete_user', UserController.deleteAnUser);

// USER MODIFICATION ROUTES

module.exports = router;