const express = require('express');
const router = express.Router();
const { query } = require('../config/database');

// GET all events
router.get('/', async (req, res) => {
  try {
    const result = await query(
      'SELECT * FROM events WHERE is_published = true ORDER BY event_date ASC'
    );
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.json({ success: true, data: [] });
  }
});

// GET single event
router.get('/:id', async (req, res) => {
  try {
    const result = await query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

module.exports = router;
