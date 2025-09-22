const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const dbConfig = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM books');
    await connection.end();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM books WHERE book_id = ?', [req.params.id]);
    await connection.end();
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { title, isbn, publication_year, publisher, total_copies, available_copies } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO books (title, isbn, publication_year, publisher, total_copies, available_copies) VALUES (?, ?, ?, ?, ?, ?)',
      [title, isbn, publication_year, publisher, total_copies, available_copies]
    );
    await connection.end();
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  const { title, isbn, publication_year, publisher, total_copies, available_copies } = req.body;
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'UPDATE books SET title = ?, isbn = ?, publication_year = ?, publisher = ?, total_copies = ?, available_copies = ? WHERE book_id = ?',
      [title, isbn, publication_year, publisher, total_copies, available_copies, req.params.id]
    );
    await connection.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute('DELETE FROM books WHERE book_id = ?', [req.params.id]);
    await connection.end();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;