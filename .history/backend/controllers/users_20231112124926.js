import User from "../models/User";
//READ
export  const getUser = async(req,res)=>{
    try {
        
    } catch (err) {
        res.status(404).json({message:err.message})
    }
}