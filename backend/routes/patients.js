const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

// Route to get all patients
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new patient
router.post('/', async (req, res) => {
  const patient = new Patient(req.body); // تأكد من أن req.body يحتوي على جميع الحقول المطلوبة
  try {
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;