const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.post('/subscribe', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    await query(
      'INSERT INTO newsletter_subscribers (email, name) VALUES ($1, $2) ON CONFLICT (email) DO NOTHING',
      [email, name]
    );
    
    res.status(201).json({ success: true, message: 'Subscribed successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to subscribe' });
  }
});

module.exports = router;
