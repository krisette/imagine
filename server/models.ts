import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

// trips schema
const tripSchema = new Schema({
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  hotel: { type: String, required: true },
  // parks: { type: String, required: true },
  parks: [{
    name: { type: String, required: true },
    date: { type: Date },
    reservations: { type: Boolean, default: false },
    tickets: { type: Boolean, default: false }
  }],
  user_id: {
    type: String,
    required: true
  }
});

export const Trip = mongoose.model('trip', tripSchema);

// parks schema
const parkSchema = new Schema({
  name: { type: String, required: true },
});

export const Park = mongoose.model('park', parkSchema);

// users schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'trip'
  }]
});

export const User = mongoose.model('user', userSchema);

// sessions schema
const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3600, default: Date.now }
});

export const Session = mongoose.model('session', sessionSchema);