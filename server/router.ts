const Router = require('@koa/router');
const router = new Router();

// ALL CONTROLLERS
const UserController = require('./controllers/UserController');
const ItemController = require('./controllers/ItemController');
const CartController = require('./controllers/CartController');
const WishlistController = require('./controllers/WishlistController');

// ALL MIDDLEWARE FUNCTIONS
const {
  ValidateRegisterAndLogin,
  ValidateUser,
} = require('./middleware/AuthMiddleware');

// USER ROUTES
router.post('/create_user', ValidateRegisterAndLogin, UserController.createNewUser);
router.post('/login', ValidateRegisterAndLogin, UserController.loginUser);

router.put('/update_user', ValidateUser, UserController.updatedAnUser);
router.delete('/delete_user', ValidateUser, UserController.deleteAnUser);
router.delete('/logout', ValidateUser, UserController.logUserOut);

// ITEM ROUTES
router.post('/create_item', ValidateUser, ItemController.createNewItem);
router.get('/item', ValidateUser, ItemController.getItem);
router.put('/update_item', ValidateUser, ItemController.updateAnItem);
router.delete('/delete_item', ValidateUser, ItemController.deleteAnItem);

// CART ROUTES
router.get('/cart', ValidateUser, CartController.getCart);
router.put('/add_cart', ValidateUser, CartController.addToCart);
router.put('/remove_cart', ValidateUser, CartController.removeCart);

// WISHLIST ROUTES
router.get('/wishlist', ValidateUser, WishlistController.getWishlist);
router.put('/add_wishlist', ValidateUser, WishlistController.addToWishlist);
router.put('/remove_wishlist', ValidateUser, WishlistController.removeFromWishlist);

module.exports = router;