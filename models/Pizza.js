const { Schema, model } = require('mongoose');
//only worried about the schema constructor and model function



// Creating The Schema
const PizzaSchema = new Schema({

    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now    // setting the default javaScript field Date.now
    },
    size: {
        type:String,
        default: 'Large'
    },
    toppings: []

});



// Creating The Model
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza Model
module.exports = Pizza;