import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import connecToDb from "./mongoDb.js";
import postRoutes from "./routes/postRoutes.js"
import EllioRoutes from "./routes/ElliotRoutes.js"


const app=express();
app.use(cors());

app.use(express.json({limit:'50mb'}));


dotenv.config();

app.get('/', async (req,res)=>{
    res.send("Elliot: HELLO!")
})

// Available routes
app.use("/api/v1/posts", postRoutes)
app.use("/api/v1/elliot", EllioRoutes)


connecToDb(process.env.MONGODB_URL);

app.listen(5000,()=>{
    console.log("The backend server is running")
})
