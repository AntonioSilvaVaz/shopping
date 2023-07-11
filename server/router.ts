const Router = require('@koa/router');
const router = new Router();

// ALL CONTROLLERS
const UserController = require('./controllers/UserController');
const ItemController = require('./controllers/ItemController');
const CartController = require('./controllers/CartController');
const WishlistController = require('./controllers/WishlistController');

// ALL MIDDLEWARE FUNCTIONS
const {ValidateRegisterAndLogin} = require('./middleware/AuthMiddleware');

// USER ROUTES
router.post('/create_user', ValidateRegisterAndLogin, UserController.createNewUser);
router.post('/login', ValidateRegisterAndLogin, UserController.loginUser);

router.put('/update_user', UserController.updatedAnUser);
router.delete('/delete_user', UserController.deleteAnUser);
router.delete('/logout', UserController.logUserOut);

// ITEM ROUTES
router.post('/create_item', ItemController.createNewItem);
router.get('/item', ItemController.getItem);
router.put('/update_item', ItemController.updateAnItem);
router.delete('/delete_item', ItemController.deleteAnItem);

// CART ROUTES
router.get('/cart', CartController.getCart);
router.put('/add_cart', CartController.addToCart);
router.put('/remove_cart', CartController.removeCart);

// WISHLIST ROUTES
router.get('/wishlist', WishlistController.getWishlist);
router.put('/add_wishlist', WishlistController.addToWishlist);
router.put('/remove_wishlist', WishlistController.removeFromWishlist);

module.exports = router;