const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await query('SELECT * FROM gallery ORDER BY uploaded_at DESC');
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
});

module.exports = router;
