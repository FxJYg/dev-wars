import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auths.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
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
app.use('/auths', authRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 3001
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});
