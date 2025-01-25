import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auths.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use('/auths', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
