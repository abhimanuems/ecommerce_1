import mongoose from "mongoose";

async function connect (mongoUrl: string){
 try{
    await mongoose.connect(mongoUrl);
    console.log("mongo connected!")
 }catch(err : any){
    console.log("Error at connection - Mongo ",err.message);
    
 }
}


export default connect