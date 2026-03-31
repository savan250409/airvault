import express from "express";
const router = express.Router();
router.get("/test", (req, res) => {
  res.send("API working");
});
import {
  getAllServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
  upload
} from "../backend/controllers/serviceController.js";
import {
  createInternship,
  getAllInternships,
  getInternshipById,
  submitTest
} from "../backend/controllers/internshipController.js";
import {
  loginAdmin,
  registerAdmin,
  logoutAdmin,
  updateAdminProfile
} from "../backend/controllers/authController.js";

import {
  createQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
  bulkInsertQuestions,
  setQuestionLimit,
  getQuestionLimit
} from "../backend/controllers/questionsController.js";
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


router.post("/internship", createInternship);
router.get("/internship", getAllInternships);
router.get("/internship/:id", getInternshipById);
// router.post("/internship/submit-test", submitTest);
router.route("/internship/submit-test")
  .post(submitTest)
  .put(submitTest);

router.post("/questions", createQuestion);
router.get("/questions", getQuestions);
router.put("/questions/:id", updateQuestion);
router.delete("/questions/:id", deleteQuestion);
router.post("/questions/bulk", bulkInsertQuestions);
router.post("/set-question-limit", setQuestionLimit);
router.get("/get-question-limit", getQuestionLimit);
export default router;
