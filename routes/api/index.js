const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');

router.use('/pizzas', pizzaRoutes);  // name used in api call

module.exports = router;