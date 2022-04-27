const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Reaction model
const toughtSchema = new Schema(
  {
    toughtText: {
      type: String,
      required:true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `reactionsCount` that gets the amount of reactions per thought
toughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

// Initialize our Thought model
const Thought = model('tought', toughtSchema);

module.exports = Thought;
