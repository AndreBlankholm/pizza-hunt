const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

router.use('/pizzas', pizzaRoutes);  // name used in api call
router.use('/comments', commentRoutes);


module.exports = router;