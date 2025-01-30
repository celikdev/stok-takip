import User from "../../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = "secretkey";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Geçerli veri kontrolü
    if (!username || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Kullanıcıyı veritabanında bul
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Şifre doğrulama
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { username: user.username, role: user.role, id: user._id },
      SECRET_KEY,
      {
        expiresIn: "365d",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // Kullanıcı var mı kontrolü
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Şifreyi hashle ve kaydet
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const check = (req, res) => {
  // Validate token and get user data
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  } else {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return res.status(200).json(decoded);
    } catch (error) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
