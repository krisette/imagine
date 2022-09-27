const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// trips schema
const tripSchema = new Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  hotel: { type: String, required: true },
  parks: [{ 
    name: String,
    id: {
      type: Schema.Types.ObjectId,
      ref: 'park'
    }
  }],
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Trip = mongoose.model('trip', tripSchema);

// parks schema
const parkSchema = new Schema({
  name: { type: String, required: true },
});

const Park = mongoose.model('park', parkSchema);

// users schema
const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'trip'
  }]
});

const User = mongoose.model('user', userSchema);

// export all models
module.exports = { Trip, Park, User };