import User from "../Model/User.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
import sendEmail from "../routes/sendEmail.js";

const forsignup = async (req, res) => {
  try {
    let { fullname, email, password, role } = req.body;
    console.log(req.body);
    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    const newuser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
    });

    const welcomeMail = `
    <div style="front-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
    <h1 style="text-align:center">welcome to Our Platform <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos%2Fpicture&psig=AOvVaw3g2HhoKY2zbUgUivjDJC84&ust=1753267844583000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCPiN4eul0I4DFQAAAAAdAAAAABAE/></h1>
    <p>Dear ${fullname} ${email},</p>\n\n
    <p> Welcome to our platform! We're excited to have you on board  Best regards.</p>\n\n 
    <ol>
      <li>Explore our features and services.</li>
      <li>Stay updated with our latest news and updates.</li>
      <li>Feel free to reach out if you have any questions or need assistance.</li>
    </ol>
    <p>Best regards \n\n</p>
    <p style="front-weight: bold;">Your Company Team</p>
    <p>Contact us at: <a href="mailto:${process.env.EMAIL_USER}></a></p>
    </div>
    
  `;
    await sendEmail(email, "Welcome to Our Platform", welcomeMail);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }

  res.status(201).json({ message: "User registered successfully" });
};

const forLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    const checkuser = await User.findOne({ email });

    if (!checkuser) return res.status(400).json({ message: "user not found" });

    let passwordMatch = await bcrypt.compare(password, checkuser.password);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid password" });

    const token = Jwt.sign(
      { id: checkuser._id, role: checkuser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      Secure: false, // Set Secure flag in production
      sameSite: "lax",
      maxAge: 3 * 60 * 60 * 1000, // 3 hours
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllUsers = async (req, res) => {
  const myusers = await User.find();

  if (!myusers) {
    return res.status(404).json({ message: "No users found" });
  }
  
  res.status(200).json(myusers);
};

const get1user = async (req, res) => {
  let { id } = req.params;

  const oneuser = await User.findById(id);

  if (!oneuser) return res.status(404).json({ message: "No user found" });

  res.status(200).send(oneuser);
};

const del1user = async (req, res) => {
  let { id } = req.params;

  const deleteduser = await User.findByIdAndDelete(id);

  if (!deleteduser) return res.status(404).json({ message: "No user found" });

  res.status(200).json({ message: "User deleted successfuly" });
};

const update1user = async (req, res) => {
  let { id } = req.params;
  let newData = req.body;

  const updateduser = await User.findByIdAndUpdate(id, newData, { new: true });

  if (!updateduser) return res.status(404).json({ message: "No user found" });

  res.status(200).json({ message: "User updated successfuly", update1user });
};

export { getAllUsers, get1user, del1user, update1user, forsignup, forLogin };
