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
import {
  getAllInsights,
  getInsight,
  addInsight,
  updateInsight,
  deleteInsight,
  uploadInsights
} from "../backend/controllers/insightsController.js";
import {
  getAllExpertTalks,
  getExpertTalk,
  addExpertTalk,
  updateExpertTalk,
  deleteExpertTalk,
  uploadExpertTalks
} from "../backend/controllers/expertTalksController.js";
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

// ---------------- Insights routes ----------------
router.get("/insights", getAllInsights);
router.get("/insights/:key", getInsight);
router.post("/insights", uploadInsights, addInsight);          // create (multipart)
router.post("/insights/:id", uploadInsights, updateInsight);   // update (multipart — admin uses POST)
router.put("/insights/:id", updateInsight);                    // update (JSON)
router.delete("/insights/:id", deleteInsight);

// ---------------- Expert Talks routes ----------------
router.get("/expert-talks", getAllExpertTalks);
router.get("/expert-talks/:key", getExpertTalk);
router.post("/expert-talks", uploadExpertTalks, addExpertTalk);
router.post("/expert-talks/:id", uploadExpertTalks, updateExpertTalk);
router.put("/expert-talks/:id", updateExpertTalk);
router.delete("/expert-talks/:id", deleteExpertTalk);

export default router;
