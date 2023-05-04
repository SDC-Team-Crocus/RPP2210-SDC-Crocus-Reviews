const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sdc-reviews');

let reviewSchema = mongoose.Schema({
  product_id: {type: Number, required: true, unique: true},
  review_id: {type: Number, required: true},
  rating: Number,
  summary: String,
  recommend: Boolean,
  response:String,
  body: String,
  date: Date,
  reviewer_name: String,
  helpfulness: Number,
  photos: [{
    photo_id:{type: Number, required: true, unique: true},
    url: String
  }]
  });

let reviewMetaSchema = mongoose.Schema({
  product_id: {type: Number, required: true, unique: true},
  ratings: {
    1: String,
    2: String,
    3: String,
    4: String,
    5: String,
  },
  recommended: {
    false: String,
    true: String,
  },
  characteristics: {
    characteristic: String,
    characteristic_id: {type: Number, required: true, unique: true},
    characteristic_value: String
  }
})