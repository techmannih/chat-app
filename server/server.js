import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDB.js';
import { app, server  } from './socket/socket.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // to parse the incoming request with JSON payloads from req.body
app.use(cookieParser()); 

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
  res.send('Welcome to the chat app');
}
);


server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on port ${PORT}`);
});
