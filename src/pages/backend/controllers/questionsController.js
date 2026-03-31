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
        // const [count] = await pool.query("SELECT COUNT(*) as total FROM questions");

        // if (count[0].total >= 40) {
        //     return res.status(400).json({
        //         status: false,
        //         message: "Maximum 40 questions allowed",
        //     });
        // }

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
        await ensureQuestionLimitColumn();

        // 👉 admin se limit lo (sirf show karna hai)
        const [adminRows] = await pool.query(
            "SELECT question_limit FROM admin ORDER BY id ASC LIMIT 1"
        );

        let limit = 10;

        if (adminRows.length > 0 && adminRows[0].question_limit) {
            limit = adminRows[0].question_limit;
        }

        // ❌ LIMIT hata diya (sab questions aayenge)
        const [rows] = await pool.query(
            `SELECT * FROM questions ORDER BY id DESC`
        );

        // ✅ final response
        res.json({
            status: true,
            question_limit: limit,
            data: rows
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false
        });
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
        let { questions } = req.body;

        // ✅ अगर single object आया तो उसे array बना दो
        if (!questions && req.body.question) {
            questions = [{
                question: req.body.question,
                options: [
                    req.body.option1,
                    req.body.option2,
                    req.body.option3,
                    req.body.option4
                ],
                correct_answer: req.body.correct_answer || null
            }];
        }

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

            let correctAnswer = null;

            if (
                q.correct_answer !== undefined &&
                q.correct_answer !== null &&
                q.correct_answer !== ""
            ) {

                let index = -1;

                if (typeof q.correct_answer === "number") {
                    if (![1, 2, 3, 4].includes(q.correct_answer)) {
                        return res.status(400).json({
                            status: false,
                            message: `Invalid correct answer for question: ${q.question}`
                        });
                    }
                    index = q.correct_answer - 1;
                }

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

                const map = ["A", "B", "C", "D"];
                correctAnswer = map[index];
            }

            values.push([
                q.question,
                q.options[0],
                q.options[1],
                q.options[2],
                q.options[3],
                correctAnswer
            ]);

            existingQuestions.push(qText);
        }

        await pool.query(
            `INSERT INTO questions 
            (question, option1, option2, option3, option4, correct_answer)
            VALUES ?`,
            [values]
        );

        return res.json({
            status: true,
            message: "Insert success"
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: "Server error"
        });
    }
};


const ensureQuestionLimitColumn = async () => {
    try {
        // check column exist or not
        const [columns] = await pool.query(`
            SHOW COLUMNS FROM admin LIKE 'question_limit'
        `);

        // agar column nahi mila to create karo
        if (columns.length === 0) {
            await pool.query(`
                ALTER TABLE admin ADD COLUMN question_limit INT DEFAULT 40
            `);

            console.log("✅ question_limit column created");
        }

    } catch (err) {
        console.log("Column check error:", err);
    }
};
export const setQuestionLimit = async (req, res) => {
    try {
        await ensureQuestionLimitColumn();

        const { limit } = req.body;

        if (!limit) {
            return res.status(400).json({
                status: false,
                message: "limit required"
            });
        }

        // 👉 first admin update karo
        await pool.query(
            "UPDATE admin SET question_limit = ? ORDER BY id ASC LIMIT 1",
            [limit]
        );

        res.json({
            status: true,
            message: "Limit saved successfully"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ status: false });
    }
};

export const getQuestionLimit = async (req, res) => {
    try {
        await ensureQuestionLimitColumn();

        // 👉 first admin se limit lo
        const [rows] = await pool.query(
            "SELECT question_limit FROM admin ORDER BY id ASC LIMIT 1"
        );

        let limit = 10;

        if (rows.length > 0 && rows[0].question_limit) {
            limit = rows[0].question_limit;
        }

        res.json({
            status: true,
            question_limit: limit
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false
        });
    }
};