import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";
import jwt from "jsonwebtoken";
export const addAdmin = async (req, res, next) => {
    const { email, password } = req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
    ){
        return res.status(422).json({ message: "Invalid Inputs" });

    }

    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
    } catch (err) {
        return next(err);
    }

    let admin;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new Admin({ email, password: hashedPassword });
        await admin.save();
        return res.status(201).json({ admin });
    } catch (err) {
        return next(err);
    }
};
export const adminLogin=async(req,res,next)=>{
    const{email,password}=req.body;
    if (
        !email &&
        email.trim() === "" &&
        !password &&
        password.trim() === ""
    )
    {
        return res.status(422).json({ message: "Invalid Inputs" });

    }
    let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email});
        
    }
    catch(err){
        return console.log(err);
    }
    if(!existingAdmin)
    {
        return res.status(400).json({message:"Admin not found"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingAdmin.password);
    if(!isPasswordCorrect)
    {
        return res.status(400).json({message:"Incorrect Password  "});

    }
    const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, { expiresIn: "7d" });

    
    return res.status(200).json({message:"Authentication Complete   ",token,id:existingAdmin._id});

};
export const getAdmins=async(req,res,next)=>
{
    let admins;
    try{
        admins=await Admin.find();
    }catch(err){
        return console.log(err)
    }
    if(!admins)
    {
        return res.status(500).json({message:"Internal Server error  "});

    }
    return res.status(200).json({admins});

};