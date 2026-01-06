// import express from "express";
// const router = express.Router();

// import {
//   getAllServices,
//   getServiceById,
//   addService,
//   updateService,
//   deleteService,
// } from "../backend/controllers/serviceController.js";

// import {
//   loginAdmin,
//   registerAdmin,
//   logoutAdmin,
//   updateAdminProfile
// } from "../backend/controllers/authController.js";

// // ---------------- Services routes ----------------
// router.get("/services", getAllServices);
// router.get("/services/:id", getServiceById);
// router.post("/services", addService);
// router.put("/services/:id", updateService);
// router.delete("/services/:id", deleteService);

// // ---------------- Auth routes ----------------
// router.post("/auth/login", loginAdmin);
// router.post("/auth/register", registerAdmin);
// router.post("/auth/logout", logoutAdmin);
// router.put("/auth/update-profile", updateAdminProfile);


// export default router;

import express from "express";
const router = express.Router();

import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  upload // multer middleware exported from controller
} from "../backend/controllers/serviceController.js";

import {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  updateAdminProfile
} from "../backend/controllers/authController.js";

// ---------------- Services routes ----------------
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);

// Use multer middleware for file uploads (image + icon)
router.post("/services", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 }
]), addService);

router.put("/services/:id", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "icon", maxCount: 1 }
]), updateService);

router.delete("/services/:id", deleteService);

// ---------------- Auth routes ----------------
router.post("/auth/login", loginAdmin);
router.post("/auth/register", registerAdmin);
router.post("/auth/logout", logoutAdmin);
router.put("/auth/update-profile", updateAdminProfile);

export default router;
