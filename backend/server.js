const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");


// Enable CORS
app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:4200',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type'],
// }));
const io = new Server(server, {
  cors: {
    // origin: "http://localhost:4200",
    origin: ["http://localhost:4200", "http://localhost:3000"],
    credentials: true
  }
  });

// Attach the Socket.IO instance to the Express app
app.set('socketio', io);

// app.use(cors());  // Apply CORS middleware to all routes
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Handle Socket.IO connections
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Disconnect event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});
  
const PORT = process.env.PORT || 5000;
// server created
server.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 
