
const express=require('express');
const app=express();
const PORT=8000;
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');
const connectToMongoDB=require('./connect');
const authRoutes=require('./routes/auth');
const {isAuthicated}=require('./middleware/auth');
const mcqRoutes=require('./routes/mcq');

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(isAuthicated);

connectToMongoDB('mongodb://127.0.0.1:27017/battle');


app.use("/", authRoutes);
app.use("/mcqs",mcqRoutes);