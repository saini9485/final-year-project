const mongoose = require("mongoose");

const addressSchema = mongoose.Schema(
  {
    street_address: { type: String, required: true },
    apartment: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: Number, required: true },
  },
  { _id: false }
);

const userAddressSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    country: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mobile: { type: String, required: true },
    address: { type: addressSchema, required: true },
    email: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const AddressModel = mongoose.model("address", userAddressSchema);

module.exports = { AddressModel };
