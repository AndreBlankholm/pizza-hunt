const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const ReplySchema = new Schema(
  {
    // set a custom id like (replyId) to avoid confusion with parent comment _id
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required: true,
      trim: true,   //removes the whit space from the beginning and end of the string
    },
    writtenBy: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => dateFormat(createdAtVal)
    },
  },
  {
    toJSON: {
      getters: true  //This adds the schema to be able to use the virtuals methods located at the bottom  
    },       
  }
);


const CommentSchema = new Schema({
  writtenBy: {
    type: String,
    required: true,
  },
  commentBody: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  replies: [ReplySchema] // associate replies with comments. Update the CommentSchema to have the replies field populated with an array
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }

);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});

const Comment = model('Comment', CommentSchema);
const Reply = model('Reply', ReplySchema);

module.exports = {Comment, Reply};