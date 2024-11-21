import { config } from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';




dotenv.config();

mongoose.connect(process.env.MONGO)
.then (() => {
    console.log('MongoDB is connected !');
})
.catch((err) => {
    console.log(err)
});


const app = express ();

app.use(cors({
    origin: 'http://localhost:5173'
  }));
  

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log("serveris running on port 3000")
});

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message

    });
});
