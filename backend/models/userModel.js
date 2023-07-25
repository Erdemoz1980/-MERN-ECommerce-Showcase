const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
  streetNo: { type: String, required: true },
  streetName: { type: String, required: true },
  postalCode: { type: String, required: true },
  province: {
    type: String,
    enum: ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK'],
    required:true
  },
  country: {
    type: String,
    enum: ['Canada'],
    default: 'Canada',
    required:true
  }
})

const userSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  address: addressSchema
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);