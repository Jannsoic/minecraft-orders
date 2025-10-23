const express = require('express');
const multer = require('multer');
const db = require('../db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, './uploads/'); },
  filename: function (req, file, cb) { cb(Date.now() + '-' + file.originalname); }
});
const upload = multer({ storage });

router.get('/', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({message:'DB error'});
    res.json(rows);
  });
});

router.post('/', auth, upload.array('images', 6), (req, res) => {
  const { title, description } = req.body;
  const images = (req.files || []).map(f => ('/uploads/' + f.filename));
  const created_at = new Date().toISOString();
  db.run('INSERT INTO tasks (title, description, creator_id, creator_name, created_at, images) VALUES (?,?,?,?,?,?)',
    [title, description, req.user.id, req.user.username, created_at, JSON.stringify(images)], function(err) {
      if (err) return res.status(500).json({message:'DB error', err: err.message});
      db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (e, row) => res.json(row));
    });
});

router.get('/:id', (req, res) => {
  db.get('SELECT * FROM tasks WHERE id = ?', [req.params.id], (err, row) => {
    if (err || !row) return res.status(404).json({message:'Not found'});
    row.images = row.images ? JSON.parse(row.images) : [];
    res.json(row);
  });
});

router.post('/:id/complete', auth, (req, res) => {
  const { message } = req.body;
  const created_at = new Date().toISOString();
  db.run('INSERT INTO completions (task_id, user_id, message, created_at) VALUES (?,?,?,?)',
    [req.params.id, req.user.id, message, created_at], function(err) {
      if (err) return res.status(500).json({message:'DB error'});
      // mark task completed = 1 (optional design choice)
      db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [req.params.id], () => {
        res.json({ok:true});
      });
    });
});

module.exports = router;
