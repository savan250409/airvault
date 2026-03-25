import { pool } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "YOUR_SECRET_KEY"; // 🔹 replace with env var in production

// ------------------ LOGIN ------------------
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and Password are required" });
    }

    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const admin = rows[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Login successful",
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        token, // 🔹 token included under admin
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ REGISTER ------------------
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, Email and Password are required" });
    }

    // Create table if not exists
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const [rows] = await pool.query("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.json({
      message: "Admin registered successfully",
      admin: { id: result.insertId, name, email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ------------------ LOGOUT ------------------
export const logoutAdmin = async (req, res) => {
  try {
    // Optional: you can blacklist token in DB if needed
    res.json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// ------------------ Update ------------------
export const updateAdminProfile = async (req, res) => {
  try {
    // 1️⃣ Get token from Authorization header
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "No token provided" });

    // 2️⃣ Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    const adminId = decoded.id; // ID from token
    const { name, email, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    // Optional: hash password if provided
    let hashedPassword = null;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // 3️⃣ Update query
    const query = `
      UPDATE admin
      SET name = ?, email = ? ${hashedPassword ? ", password = ?" : ""}
      WHERE id = ?
    `;

    const params = hashedPassword ? [name, email, hashedPassword, adminId] : [name, email, adminId];

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({
      message: "Profile updated successfully",
      admin: { id: adminId, name, email },
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};