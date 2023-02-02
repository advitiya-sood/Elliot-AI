import mongoose from "mongoose"

const connecToDb=(url)=>{
    mongoose.set('strictQuery',true);
    mongoose.connect(url)
    .then(()=>{console.log("Connected to momgo Db")})
    .catch((err)=>{console.log(err)})
}

export default connecToDb;