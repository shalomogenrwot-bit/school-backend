const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM staff WHERE is_active = true ORDER BY display_order ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
});

module.exports = router;
