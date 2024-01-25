const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const fileRoutes = require('./routes/fileRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
connectDB();

app.use(bodyParser.json());

// Routes
app.use('/files', fileRoutes);
app.use('/upload', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
