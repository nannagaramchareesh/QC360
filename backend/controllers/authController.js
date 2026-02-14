import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
  );
};


const registerUser = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;
    console.log(req.body)
    console.log("HITTING")
    if (!name || !email || !password || !roles) {
      return res.json({success:false, message: "All fields are required" });
    }

    // Check existing
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({success:false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles, // must be array
    });

    res.json({
      success: true,
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    console.log("HELLO WROLD");
    const { email, password } = req.body;
    console.log(req.body)
    // Check user
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
      return res.json({success:false, message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({success:false, message: "Invalid credentials" });
    }

    // Generate token
    const token = generateToken(user);
    console.log(token)
    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    res.json({success:false, message: error.message });
  }
};

export { registerUser, loginUser };
