import { pool } from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ---------------- uploads ----------------
const UPLOAD_DIR = path.join("uploads", "expert_talks");

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    cb(null, UPLOAD_DIR);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
export const uploadExpertTalks = multer({ storage }).any();

const savedImagePaths = (req) =>
  (req.files || [])
    .filter((f) => f.fieldname === "images" || f.fieldname === "images[]")
    .map((f) => `uploads/expert_talks/${f.filename}`);

const deleteImageFiles = (paths) => {
  if (!Array.isArray(paths)) return;
  for (const p of paths) {
    if (!p || /^https?:\/\//i.test(p)) continue;
    const full = path.join(...p.replace(/^\/+/, "").split("/"));
    if (fs.existsSync(full)) {
      try { fs.unlinkSync(full); } catch { /* ignore */ }
    }
  }
};

const parseImages = (raw) => {
  if (Array.isArray(raw)) return raw;
  try { const d = JSON.parse(raw || "[]"); return Array.isArray(d) ? d : []; }
  catch { return []; }
};

// ---------------- slug helpers ----------------
const slugify = (text) => {
  const s = String(text || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return s || "expert-talk";
};

const uniqueSlug = async (base) => {
  const root = slugify(base);
  let slug = root, i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.query("SELECT id FROM expert_talks WHERE slug = ?", [slug]);
    if (rows.length === 0) return slug;
    slug = `${root}-${i++}`;
  }
};

const SELECT_COLS =
  "id, slug, episode, title, description, content, speaker, designation, topic, duration, image, images, date, created_at";

// ---------------- GET ALL ----------------
export const getAllExpertTalks = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${SELECT_COLS} FROM expert_talks ORDER BY id DESC`);
    res.json({ status: true, data: rows });
  } catch (err) {
    res.json({ status: false, message: "Fetch Error: " + err.message });
  }
};

// ---------------- GET ONE (by id or slug) ----------------
export const getExpertTalk = async (req, res) => {
  try {
    const key = req.params.key;
    const byId = /^\d+$/.test(String(key));
    const [rows] = await pool.query(
      `SELECT ${SELECT_COLS} FROM expert_talks WHERE ${byId ? "id" : "slug"} = ?`,
      [key]
    );
    if (!rows.length) return res.json({ status: false, message: "Expert Talk not found" });
    res.json({ status: true, data: rows[0] });
  } catch (err) {
    res.json({ status: false, message: "Fetch Error: " + err.message });
  }
};

// ---------------- CREATE ----------------
export const addExpertTalk = async (req, res) => {
  try {
    const d = req.body || {};
    const title = (d.title || "").trim();
    if (!title) return res.json({ status: false, message: "Title is required" });

    const episode = (d.episode || "").trim();
    const description = (d.description || "").trim();
    const content = (d.content || "").trim();
    const speaker = (d.speaker || "").trim();
    const designation = (d.designation || "").trim();
    const topic = (d.topic || "").trim();
    const duration = (d.duration || "").trim();
    const image = (d.image || "").trim();
    const date = (d.date || "").trim() || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const slug = await uniqueSlug(d.slug || title);

    let imgs = savedImagePaths(req);
    if (!imgs.length && d.images) imgs = parseImages(d.images);
    const imagesJson = JSON.stringify(imgs);

    const [result] = await pool.query(
      `INSERT INTO expert_talks (slug, episode, title, description, content, speaker, designation, topic, duration, image, images, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, episode, title, description, content, speaker, designation, topic, duration, image, imagesJson, date]
    );

    res.json({ status: true, message: "Expert Talk added successfully", data: { id: result.insertId, slug } });
  } catch (err) {
    res.json({ status: false, message: "Insert Error: " + err.message });
  }
};

// ---------------- UPDATE ----------------
export const updateExpertTalk = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body || {};
    const title = (d.title || "").trim();
    if (!title) return res.json({ status: false, message: "Title is required" });

    const episode = (d.episode || "").trim();
    const description = (d.description || "").trim();
    const content = (d.content || "").trim();
    const speaker = (d.speaker || "").trim();
    const designation = (d.designation || "").trim();
    const topic = (d.topic || "").trim();
    const duration = (d.duration || "").trim();

    const touchImages = (req.files && req.files.length) || d.existing_images !== undefined;

    if (touchImages) {
      const [oldRows] = await pool.query("SELECT images FROM expert_talks WHERE id = ?", [id]);
      const oldImgs = oldRows.length ? parseImages(oldRows[0].images) : [];
      const kept = parseImages(d.existing_images);
      const final = [...kept, ...savedImagePaths(req)];
      deleteImageFiles(oldImgs.filter((p) => !final.includes(p)));

      await pool.query(
        `UPDATE expert_talks SET episode=?, title=?, description=?, content=?, speaker=?, designation=?, topic=?, duration=?, images=? WHERE id=?`,
        [episode, title, description, content, speaker, designation, topic, duration, JSON.stringify(final), id]
      );
    } else {
      await pool.query(
        `UPDATE expert_talks SET episode=?, title=?, description=?, content=?, speaker=?, designation=?, topic=?, duration=? WHERE id=?`,
        [episode, title, description, content, speaker, designation, topic, duration, id]
      );
    }

    res.json({ status: true, message: "Expert Talk updated successfully" });
  } catch (err) {
    res.json({ status: false, message: "Update Error: " + err.message });
  }
};

// ---------------- DELETE ----------------
export const deleteExpertTalk = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT images FROM expert_talks WHERE id = ?", [id]);
    if (rows.length) deleteImageFiles(parseImages(rows[0].images));

    await pool.query("DELETE FROM expert_talks WHERE id = ?", [id]);
    res.json({ status: true, message: "Expert Talk deleted successfully" });
  } catch (err) {
    res.json({ status: false, message: "Delete Error: " + err.message });
  }
};
