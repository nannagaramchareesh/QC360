import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connect from './config/db.js';
import authRoutes from './routes/authRoutes.js';
const app = express();
const port = process.env.PORT;

connect();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})