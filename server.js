const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');


dotenv.config();
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000", // development ke liye
    "https://task-manager-frontend-eta-vert.vercel.app" // production ke liye
  ],
  credentials: true
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error(err));

module.exports = app;