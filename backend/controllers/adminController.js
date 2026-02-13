import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const generateToken = () => {
  return jwt.sign(
    {
      email:process.env.ADMIN_EMAIL,
      password:process.env.ADMIN_PASSWORD
    },
    process.env.JWT_SECRET,
  );
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const login = (req,res)=>{
  try{
    const {email,password} = req.body;
    console.log(process.env.ADMIN_EMAIL,process.env.ADMIN_PASSWORD)

    if(email==process.env.ADMIN_EMAIL && password==process.env.ADMIN_PASSWORD){
      const token = generateToken();
      res.json({success:true, message:"Login Successful",token});
    }
    else res.json({success:false,message:"Inavalid credentials"});
  }
  catch(error){
    res.json({success:false,message:error.message})
  }
}



export {getAllUsers,login};