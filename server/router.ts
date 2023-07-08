const Router = require('@koa/router');
const router = new Router();

const UserController = require('./controllers/UserController');
const ItemController = require('./controllers/ItemController');

// USER ROUTES
router.post('/create_user', UserController.createNewUser);
router.post('/login', UserController.loginUser);
router.put('/update_user', UserController.updatedAnUser);
router.delete('/delete_user', UserController.deleteAnUser);
router.delete('/logout', UserController.logUserOut);

// ITEM ROUTES
router.post('/create_item', ItemController.createNewItem);
router.get('/item', ItemController.getItem);
router.put('/update_item', ItemController.updateAnItem);


module.exports = router;