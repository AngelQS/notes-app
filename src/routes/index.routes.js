// Third
const { Router } = require('express');

// Local
const {
  renderIndex,
  renderAbout,
} = require('../controllers/index.controllers');

// Initialization
const router = Router();

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;
