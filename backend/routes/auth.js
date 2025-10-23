const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();
const secret = process.env.JWT_SECRET || 'replace_this_with_a_secure_secret';

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({message:'Missing fields'});
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (username, password) VALUES (?,?)', [username, hash], function(err) {
    if (err) return res.status(400).json({message: 'User exists or error', error: err.message});
    const user = { id: this.lastID, username };
    const token = jwt.sign(user, secret, {expiresIn:'7d'});
    res.json({token, user});
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({message:'Missing fields'});
  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, row) => {
    if (err || !row) return res.status(400).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password, row.password);
    if (!ok) return res.status(400).json({message:'Invalid credentials'});
    const user = { id: row.id, username: row.username };
    const token = jwt.sign(user, secret, {expiresIn:'7d'});
    res.json({token, user});
  });
});

module.exports = router;
