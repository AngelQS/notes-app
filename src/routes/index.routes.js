// Third
const { Router } = require('express');

// Local
const { renderIndex, renderAbout } = require('../controllers/index.controller');

// Initialization
const router = Router();

router.get('/', renderIndex);

router.get('/about', renderAbout);

module.exports = router;
