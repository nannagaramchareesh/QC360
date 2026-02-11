import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connect from './config/db.js';
const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

connect();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})