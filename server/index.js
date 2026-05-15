import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDb from './config/mongodb.js';
import routes from './routes/authRoute.js';
import router from './routes/userRoute.js';


const app =express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({origin:"http://localhost:5173",
    credentials: true}));

connectDb();
app.use('/api/auth',routes);
app.use('/api/users',router)
app.listen(process.env.PORT,()=>{
    console.log("server running")
});