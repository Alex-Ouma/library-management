const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM members');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM members WHERE member_id = ?', [req.params.id]);
    await connection.end();
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { first_name, last_name, email, join_date, phone } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO members (first_name, last_name, email, join_date, phone) VALUES (?, ?, ?, ?, ?)',
      [first_name, last_name, email, join_date, phone]
    );
    await connection.end();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { first_name, last_name, email, join_date, phone } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE members SET first_name = ?, last_name = ?, email = ?, join_date = ?, phone = ? WHERE member_id = ?',
      [first_name, last_name, email, join_date, phone, req.params.id]
    );
    await connection.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM members WHERE member_id = ?', [req.params.id]);
    await connection.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Member not found' });
    }
    res.json({ message: 'Member deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;