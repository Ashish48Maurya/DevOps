import 'dotenv/config';
import express from "express"
import mongoConnect from './db.js';
import router from './route/route.js';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 8000;

app.use(cors(
    {
        origin: process.env.FRONTEND_URL
    }
));
app.use(express.json());
app.use('/api',router)

app.listen(port, async() => {  
    await mongoConnect();  
    console.log(`Server is running on port ${port}`);
});