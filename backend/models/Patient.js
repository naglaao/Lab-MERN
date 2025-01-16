const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Add the date field
  patientName: { type: String, required: true },
  gender: { type: String, required: true },
  patientAge: { type: Number, required: true },
  doctorName: { type: String, required: true },
  test: [
    {
      tname: { type: String, required: true },
      tnormalRange: { type: String, required: true },
      tresult: { type: String, required: true },
      tprice: { type: Number, required: true },
      category: { type: String, required: true }, // إضافة حقل التصنيف
    },
  ],
});

module.exports = mongoose.model('Test', testSchema);