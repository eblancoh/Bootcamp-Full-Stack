import mongoose, { Schema } from "mongoose";

export const connect = () => {
  try {
    return mongoose.connect(`mongodb://localhost:27017/mock-database`);
  } catch (error) {
    throw error;
  }
};

export const UsersModel = mongoose.model(
  "users",
  new Schema({
    _id: Schema.ObjectId,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    address: {
      city: String,
      state: String,
      country: String,
      country_code: String,
    },
    card: {
      card_number: String,
      card_type: String,
      currency_code: String,
      balance: String,
    },
    married_status: Boolean,
  })
);
