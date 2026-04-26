const Registration = require('../models/Registration');

// @desc  Register a user for an event
// @route POST /api/registrations
const createRegistration = async (req, res) => {
  try {
    const { name, email, phone, eventName, college, year, message } = req.body;

    // Check for duplicate email+event combination
    const existing = await Registration.findOne({ email, eventName });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered for this event.',
      });
    }

    const registration = await Registration.create({
      name,
      email,
      phone,
      eventName,
      college,
      year,
      message,
    });

    res.status(201).json({ success: true, data: registration });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc  Get all registrations
// @route GET /api/registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc  Get registrations by event name
// @route GET /api/registrations/event/:eventName
const getRegistrationsByEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({
      eventName: { $regex: new RegExp(req.params.eventName, 'i') },
    }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: registrations.length, data: registrations });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc  Delete a registration
// @route DELETE /api/registrations/:id
const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.status(200).json({ success: true, message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration,
};
