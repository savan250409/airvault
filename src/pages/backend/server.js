import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";

import router from "./routes.js"; // all routes
const app = express();
const PORT = 8090;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// Serve uploaded images at /uploads/... (insights, expert_talks, etc.)
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Mount all routes
app.use("/api", router);

// Root
app.get("/", (req, res) => res.send("Backend running"));

// Start server
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
