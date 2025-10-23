const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 4000;

// ----------------- CORS korrekt setzen -----------------
app.use(cors({
  origin: '*', // erlaubt alle Domains; optional kannst du nur deine Frontend-URL eintragen
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
// -----------------------------------------------------

app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
