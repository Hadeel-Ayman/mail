
const express = require('express');
const { mail, contact } = require('../Controller/emailController');
const router = express.Router();

router.post('/send-email', mail);
router.get('/contact', contact);

module.exports = router;