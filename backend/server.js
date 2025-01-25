import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auths.routes.js';
import userRoutes from './routes/user.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
//   try {
//     // Simple test to see if the connection works
//     const result = await pool.query('SELECT NOW()');
//     console.log('Connected to PostgreSQL:', result.rows);
//     res.send('PostgreSQL connected successfully!');
//   } catch (error) {
//     console.error('Error connecting to PostgreSQL:', error);
//     res.status(500).send('Database connection failed');
//   }
// });
//app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());
app.use('/auths', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
