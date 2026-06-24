import { pool } from "../db.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// ---------------- uploads ----------------
const UPLOAD_DIR = path.join("uploads", "insights");

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
// Admin form appends files as `images[]`; accept any and filter below.
export const uploadInsights = multer({ storage }).any();

// Relative web paths for the files multer just stored.
const savedImagePaths = (req) =>
  (req.files || [])
    .filter((f) => f.fieldname === "images" || f.fieldname === "images[]")
    .map((f) => `uploads/insights/${f.filename}`);

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
  return s || "insight";
};

const uniqueSlug = async (base) => {
  const root = slugify(base);
  let slug = root, i = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const [rows] = await pool.query("SELECT id FROM insights WHERE slug = ?", [slug]);
    if (rows.length === 0) return slug;
    slug = `${root}-${i++}`;
  }
};

const SELECT_COLS =
  "id, slug, title, excerpt, content, author, category, read_time AS readTime, tags, image, images, date, created_at";

// ---------------- GET ALL ----------------
export const getAllInsights = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${SELECT_COLS} FROM insights ORDER BY id DESC`);
    res.json({ status: true, data: rows });
  } catch (err) {
    res.json({ status: false, message: "Fetch Error: " + err.message });
  }
};

// ---------------- GET ONE (by id or slug) ----------------
export const getInsight = async (req, res) => {
  try {
    const key = req.params.key;
    const byId = /^\d+$/.test(String(key));
    const [rows] = await pool.query(
      `SELECT ${SELECT_COLS} FROM insights WHERE ${byId ? "id" : "slug"} = ?`,
      [key]
    );
    if (!rows.length) return res.json({ status: false, message: "Insight not found" });
    res.json({ status: true, data: rows[0] });
  } catch (err) {
    res.json({ status: false, message: "Fetch Error: " + err.message });
  }
};

// ---------------- CREATE ----------------
export const addInsight = async (req, res) => {
  try {
    const d = req.body || {};
    const title = (d.title || "").trim();
    if (!title) return res.json({ status: false, message: "Title is required" });

    const excerpt = (d.excerpt || d.description || "").trim();
    const content = (d.content || "").trim();
    const author = (d.author || "").trim();
    const category = (d.category || "").trim();
    const readTime = (d.readTime || d.read_time || "").trim();
    const tags = (d.tags || "").trim();
    const image = (d.image || "").trim();
    const date = (d.date || "").trim() || new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const slug = await uniqueSlug(d.slug || title);

    let imgs = savedImagePaths(req);
    if (!imgs.length && d.images) imgs = parseImages(d.images);
    const imagesJson = JSON.stringify(imgs);

    const [result] = await pool.query(
      `INSERT INTO insights (slug, title, excerpt, content, author, category, read_time, tags, image, images, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [slug, title, excerpt, content, author, category, readTime, tags, image, imagesJson, date]
    );

    res.json({ status: true, message: "Insight added successfully", data: { id: result.insertId, slug } });
  } catch (err) {
    res.json({ status: false, message: "Insert Error: " + err.message });
  }
};

// ---------------- UPDATE ----------------
export const updateInsight = async (req, res) => {
  try {
    const id = req.params.id;
    const d = req.body || {};
    const title = (d.title || "").trim();
    if (!title) return res.json({ status: false, message: "Title is required" });

    const excerpt = (d.excerpt || d.description || "").trim();
    const content = (d.content || "").trim();
    const author = (d.author || "").trim();
    const category = (d.category || "").trim();
    const readTime = (d.readTime || d.read_time || "").trim();
    const tags = (d.tags || "").trim();

    const touchImages = (req.files && req.files.length) || d.existing_images !== undefined;

    if (touchImages) {
      const [oldRows] = await pool.query("SELECT images FROM insights WHERE id = ?", [id]);
      const oldImgs = oldRows.length ? parseImages(oldRows[0].images) : [];
      const kept = parseImages(d.existing_images);
      const final = [...kept, ...savedImagePaths(req)];
      deleteImageFiles(oldImgs.filter((p) => !final.includes(p))); // remove orphans

      await pool.query(
        `UPDATE insights SET title=?, excerpt=?, content=?, author=?, category=?, read_time=?, tags=?, images=? WHERE id=?`,
        [title, excerpt, content, author, category, readTime, tags, JSON.stringify(final), id]
      );
    } else {
      await pool.query(
        `UPDATE insights SET title=?, excerpt=?, content=?, author=?, category=?, read_time=?, tags=? WHERE id=?`,
        [title, excerpt, content, author, category, readTime, tags, id]
      );
    }

    res.json({ status: true, message: "Insight updated successfully" });
  } catch (err) {
    res.json({ status: false, message: "Update Error: " + err.message });
  }
};

// ---------------- DELETE ----------------
export const deleteInsight = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await pool.query("SELECT images FROM insights WHERE id = ?", [id]);
    if (rows.length) deleteImageFiles(parseImages(rows[0].images));

    await pool.query("DELETE FROM insights WHERE id = ?", [id]);
    res.json({ status: true, message: "Insight deleted successfully" });
  } catch (err) {
    res.json({ status: false, message: "Delete Error: " + err.message });
  }
};
