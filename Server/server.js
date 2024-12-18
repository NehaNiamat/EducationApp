const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 3000;


app.use(cors());
app.use(bodyParser.json());

// In-memory storage for progress (replace with a database in production)
let userProgress = 0;

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Education App Server');
});

// Fetch Progress
app.get('/progress', (req, res) => {
  res.json({ progress: userProgress });
});

// Update Progress
app.post('/progress', (req, res) => {
  const { progress } = req.body;
  if (progress !== undefined && progress >= 0 && progress <= 100) {
    userProgress = progress;
    res.json({ message: 'Progress updated successfully', progress: userProgress });
  } else {
    res.status(400).json({ error: 'Invalid progress value' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
