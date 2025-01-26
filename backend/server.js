import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auths.routes.js';
import userRoutes from './routes/user.routes.js';
import judgeRoutes from './routes/judge.route.js';
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
app.use('/judge', judgeRoutes)

const PORT = process.env.PORT || 3001
const PORT2 = process.env.PORT2 || 3002
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:" + PORT);
});

const app2 = express();

app2.get("/",(req,res) =>{
  res.send("Welcome");
});

export default app2;
app2.listen(PORT2, ()=>{
  console.log("Server running at http://localhost:" + PORT2);
})
