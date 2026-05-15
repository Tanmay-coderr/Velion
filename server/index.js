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
app.use(cors());

connectDb();
app.use('/api/auth',routes);
app.use('/api/users',router)
const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log("server running")
});