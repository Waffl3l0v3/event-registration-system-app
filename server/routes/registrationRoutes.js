const express = require('express');
const router = express.Router();
const {
  createRegistration,
  getAllRegistrations,
  getRegistrationsByEvent,
  deleteRegistration,
} = require('../controllers/registrationController');

router.post('/', createRegistration);
router.get('/', getAllRegistrations);
router.get('/event/:eventName', getRegistrationsByEvent);
router.delete('/:id', deleteRegistration);

module.exports = router;
