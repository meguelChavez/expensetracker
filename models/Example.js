const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
const ExampleSchema = new Schema({
    todo: {
        type: String,
        required: "You must include an item name"
    },
    completed: {
        type: Boolean,
        default: false
    }
}, {
        timestamps: {
            type: Date
        }
    });

// This creates our model from the above schema, using Mongoose's model method
var Example = mongoose.model('Example', ExampleSchema);

// Export the Example model
module.exports = Example;