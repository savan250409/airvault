import { pool } from "../db.js";

// ================= CREATE =================
export const createQuestion = async (req, res) => {
    try {
        const { question, option1, option2, option3, option4, correct_answer } = req.body;

        if (!question || !option1 || !option2 || !option3 || !option4) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        const [existing] = await pool.query(
            "SELECT id FROM questions WHERE LOWER(question) = LOWER(?)",
            [question]
        );

        if (existing.length > 0) {
            return res.status(400).json({
                status: false,
                message: "Question already exists"
            });
        }

        // ✅ LIMIT 40 CHECK
        const [count] = await pool.query("SELECT COUNT(*) as total FROM questions");

        if (count[0].total >= 40) {
            return res.status(400).json({
                status: false,
                message: "Maximum 40 questions allowed",
            });
        }

        const sql = `
            INSERT INTO questions 
            (question, option1, option2, option3, option4, correct_answer)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.query(sql, [
            question, option1, option2, option3, option4, correct_answer
        ]);

        res.json({
            status: true,
            message: "Question added",
            data: { id: result.insertId }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false, message: "Error" });
    }
};

// ================= GET ALL =================
export const getQuestions = async (req, res) => {
    try {
        // ✅ ONLY 40 RETURN
        const [rows] = await pool.query(
            "SELECT * FROM questions ORDER BY id DESC LIMIT 40"
        );

        res.json({
            status: true,
            data: rows
        });

    } catch (err) {
        res.status(500).json({ status: false });
    }
};

// ================= UPDATE =================
export const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, option1, option2, option3, option4, correct_answer } = req.body;

        const sql = `
            UPDATE questions 
            SET question=?, option1=?, option2=?, option3=?, option4=?, correct_answer=?
            WHERE id=?
        `;

        await pool.query(sql, [
            question, option1, option2, option3, option4, correct_answer, id
        ]);

        res.json({
            status: true,
            message: "Updated successfully"
        });

    } catch (err) {
        res.status(500).json({ status: false });
    }
};

// ================= DELETE =================
export const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        await pool.query("DELETE FROM questions WHERE id = ?", [id]);

        res.json({
            status: true,
            message: "Deleted"
        });

    } catch (err) {
        res.status(500).json({ status: false });
    }
};
export const bulkInsertQuestions = async (req, res) => {
    try {
        const { questions } = req.body;

        if (!questions || !Array.isArray(questions)) {
            return res.status(400).json({
                status: false,
                message: "Invalid format"
            });
        }

        const [existingRows] = await pool.query(
            "SELECT question FROM questions"
        );

        const existingQuestions = existingRows.map(q =>
            q.question.toLowerCase()
        );

        const values = [];

        for (let q of questions) {

            if (!q.question || !q.options || q.options.length !== 4) {
                return res.status(400).json({
                    status: false,
                    message: "Each question must have 4 options"
                });
            }

            const qText = q.question.toLowerCase();

            if (existingQuestions.includes(qText)) {
                return res.status(400).json({
                    status: false,
                    message: `Duplicate question found: ${q.question}`
                });
            }

            let correctAnswer = null; // default

            if (
                q.correct_answer !== undefined &&
                q.correct_answer !== null &&
                q.correct_answer !== ""
            ) {

                let index = -1;

                // number case (1–4)
                if (typeof q.correct_answer === "number") {
                    if (![1, 2, 3, 4].includes(q.correct_answer)) {
                        return res.status(400).json({
                            status: false,
                            message: `Invalid correct answer for question: ${q.question}`
                        });
                    }
                    index = q.correct_answer - 1;
                }

                // string case
                else if (typeof q.correct_answer === "string") {
                    index = q.options.findIndex(
                        opt =>
                            opt.toLowerCase().trim() ===
                            q.correct_answer.toLowerCase().trim()
                    );

                    if (index === -1) {
                        return res.status(400).json({
                            status: false,
                            message: `Correct answer must match options for: ${q.question}`
                        });
                    }
                }

                else {
                    return res.status(400).json({
                        status: false,
                        message: `Invalid correct answer format`
                    });
                }

                // ✅ convert to A/B/C/D
                const map = ["A", "B", "C", "D"];
                correctAnswer = map[index];
            }

            values.push([
                q.question,
                q.options[0],
                q.options[1],
                q.options[2],
                q.options[3],
                correctAnswer // A/B/C/D or NULL
            ]);

            existingQuestions.push(qText);
        }

        if (existingQuestions.length > 40) {
            return res.status(400).json({
                status: false,
                message: "Max 40 questions allowed"
            });
        }

        await pool.query(
            `INSERT INTO questions 
            (question, option1, option2, option3, option4, correct_answer)
            VALUES ?`,
            [values]
        );

        return res.json({
            status: true,
            message: "Bulk insert success"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};