const { Schema, model } = require('mongoose');


const PizzaSchema = new Schema({
  pizzaName: {
    type: String,
    required: true,  // adding validation/ will require data to exist for that field
    trim: true       // removes white space before and after the input string
  },
  createdBy: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)  //getters method/ middleware for date using the utils/dateFormat.js file
  },
  size: {
    type: String,
    required: true,
    enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
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
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0); // Here we're using the .reduce() method to tally up the total of every comment with its replies. In its basic form
});

const Pizza = model('Pizza', PizzaSchema);

module.exports = Pizza;