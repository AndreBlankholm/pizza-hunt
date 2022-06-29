const { Schema, model } = require('mongoose');


const PizzaSchema = new Schema({
  pizzaName: {
    type: String
  },
  createdBy: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)  //getters method/ middleware for date using the utils/dateFormat.js file
  },
  size: {
    type: String,
    default: 'Large'
  },
  comments: [
    {
      type: Schema.Types.ObjectId,   // (18.2.4) We'll need to update it to refer to the Comment type that we've created.
      ref: "Comment"               // we need to tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model.
    }                             // The ref property is especially important because it tells the Pizza model which documents to search to find the right comments.
  ],
  toppings: [],
},
{
  toJSON: {
    virtuals: true,  //This adds the schema to be able to use the virtuals methods located at the bottom  
  },
  id: false         //We set id to false because this is a virtual that Mongoose returns, and we don’t need it.
}
);

// get total count of comments and replies on retrieval / Needs toJSON property to the schema options as seen above.
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;