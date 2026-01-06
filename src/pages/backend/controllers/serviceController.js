import { pool } from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (file.fieldname === "image") {
      uploadPath = path.join("public/uploads/service/image");
    } else if (file.fieldname === "icon") {
      uploadPath = path.join("public/uploads/service/icon");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + ext; 
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// -------------------- GET ALL SERVICES --------------------
export const getAllServices = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services");

    const formatted = rows.map(service => {
      let features = service.features;

      try {
        if (typeof features === "string" && features.trim().startsWith("[")) {
          const parsed = JSON.parse(features);
          if (Array.isArray(parsed)) {
            features = parsed.join(", ");
          }
        }
        else if (Array.isArray(features)) {
          features = features.join(", ");
        }
        else if (typeof features === "string") {
          features = features.split(",").map(f => f.trim()).join(", ");
        }
        else {
          features = "";
        }
      } catch {
        features = typeof features === "string" ? features : "";
      }

      const iconUrl = service.icon
        ? `http://localhost:8081/uploads/service/icon/${service.icon}`
        : null;
      const imageUrl = service.image
        ? `http://localhost:8081/uploads/service/image/${service.image}`
        : null;

      return { ...service, features, icon: iconUrl, image: imageUrl };
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// -------------------- GET SINGLE SERVICE -------------------

export const getServiceById = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Service not found" });

    const service = rows[0];

    let features = "";
    try {
      const parsed = JSON.parse(service.features);
      if (Array.isArray(parsed)) {
        features = parsed.join(", ");
      } else {
        features = String(parsed);
      }
    } catch {
      features = service.features || "";
    }

    const iconUrl = service.icon
      ? `${req.protocol}://${req.get("host")}/uploads/service/icon/${service.icon}`
      : null;
    const imageUrl = service.image
      ? `${req.protocol}://${req.get("host")}/uploads/service/image/${service.image}`
      : null;

    res.json({
      ...service,
      features,
      icon: iconUrl,
      image: imageUrl,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// -------------------- ADD SERVICE --------------------
export const addService = async (req, res) => {
  try {
    const { title = "", description = "", features = "", details = "" } = req.body;

    const image = req.files?.image ? req.files.image[0].filename : null;
    const icon = req.files?.icon ? req.files.icon[0].filename : null;

    let featuresArray = [];
    if (features) {
      try {
        const parsed = JSON.parse(features);
        if (Array.isArray(parsed)) {
          featuresArray = parsed.map(f => f.trim()).filter(Boolean);
        } else if (typeof parsed === "string") {
          featuresArray = parsed.split(",").map(f => f.trim()).filter(Boolean);
        }
      } catch {
        featuresArray = features.split(",").map(f => f.trim()).filter(Boolean);
      }
    }

    // Save clean JSON string
    const [result] = await pool.query(
      "INSERT INTO services (title, description, icon, image, features, details) VALUES (?, ?, ?, ?, ?, ?)",
      [title, description, icon, image, JSON.stringify(featuresArray), details]
    );

    const [newService] = await pool.query("SELECT * FROM services WHERE id = ?", [result.insertId]);
    const service = newService[0];

    const featuresStr = Array.isArray(featuresArray)
      ? featuresArray.join(", ")
      : String(featuresArray);

    res.json({
      message: "Service added successfully",
      service: {
        ...service,
        features: featuresStr,
        icon: icon
          ? `${req.protocol}://${req.get("host")}/uploads/service/icon/${icon}`
          : null,
        image: image
          ? `${req.protocol}://${req.get("host")}/uploads/service/image/${image}`
          : null,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// -------------------- UPDATE SERVICE --------------------
export const updateService = async (req, res) => {
  try {
    const { title = "", description = "", features = "", details = "" } = req.body;

    const [existingRows] = await pool.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (!existingRows.length) return res.status(404).json({ message: "Service not found" });

    const existingService = existingRows[0];

    const newImage = req.files?.image ? req.files.image[0].filename : null;
    const newIcon = req.files?.icon ? req.files.icon[0].filename : null;

    if (newImage && existingService.image) deleteFile(path.join("public/uploads/service/image", existingService.image));
    if (newIcon && existingService.icon) deleteFile(path.join("public/uploads/service/icon", existingService.icon));

    const finalImage = newImage || existingService.image;
    const finalIcon = newIcon || existingService.icon;

    const featuresArray = features ? features.split(",").map(f => f.trim()) : JSON.parse(existingService.features || "[]");

    await pool.query(
      "UPDATE services SET title = ?, description = ?, icon = ?, image = ?, features = ?, details = ? WHERE id = ?",
      [title, description, finalIcon, finalImage, JSON.stringify(featuresArray), details, req.params.id]
    );

    const [updatedRows] = await pool.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
    const updatedService = updatedRows[0];

    // Convert features to string
    let featuresStr = updatedService.features;
    try {
      const parsed = JSON.parse(featuresStr);
      if (Array.isArray(parsed)) featuresStr = parsed.join(", ");
    } catch {}

    res.json({
      message: "Service updated successfully",
      service: {
        ...updatedService,
        features: featuresStr,
        icon: finalIcon ? `${req.protocol}://${req.get("host")}/uploads/service/icon/${finalIcon}` : null,
        image: finalImage ? `${req.protocol}://${req.get("host")}/uploads/service/image/${finalImage}` : null
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -------------------- DELETE SERVICE --------------------
export const deleteService = async (req, res) => {
  try {
    const [existingRows] = await pool.query("SELECT * FROM services WHERE id = ?", [req.params.id]);
    if (!existingRows.length) return res.status(404).json({ message: "Service not found" });

    const service = existingRows[0];
    if (service.image) deleteFile(path.join("public/uploads/service/image", service.image));
    if (service.icon) deleteFile(path.join("public/uploads/service/icon", service.icon));

    await pool.query("DELETE FROM services WHERE id = ?", [req.params.id]);

    res.json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
