import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import BASE_URI from "@/config";

interface Question {
    id?: number;
    question: string;
    option1: string;
    option2: string;
    option3: string;
    option4: string;
    correct_answer: string;
}

const Questions = () => {

    const [questions, setQuestions] = useState<Question[]>([]);
    const [editId, setEditId] = useState<number | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [mode, setMode] = useState<"single" | "bulk">("single");

    const [bulkJson, setBulkJson] = useState("");

    const [addForm, setAddForm] = useState<Question>({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct_answer: "",
    });

    const [editForm, setEditForm] = useState<Question>({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correct_answer: "",
    }); const [limit, setLimit] = useState<number>(0);

    // ================= FETCH =================
    const fetchQuestions = async () => {
        try {
            const res = await axios.get(`${BASE_URI}/api/questions`);
            setQuestions(res.data.data || []);
        } catch {
            toast.error("Failed to fetch questions");
        }
    };

    useEffect(() => {
        fetchQuestions();
        fetchLimit(); // 👈 ye add kar

    }, []);
    const fetchLimit = async () => {
        try {
            const res = await axios.get(`${BASE_URI}/api/get-question-limit`);
            setLimit(res.data.question_limit || 0);
        } catch {
            toast.error("Failed to fetch limit");
        }
    };

    // ================= ADD =================
    const handleAdd = async () => {
        try {
            await axios.post(`${BASE_URI}/api/questions`, addForm);

            toast.success("Question added ✅");

            setAddForm({
                question: "",
                option1: "",
                option2: "",
                option3: "",
                option4: "",
                correct_answer: "",
            });

            fetchQuestions();

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`${BASE_URI}/api/questions/${id}`);

            toast.success("Deleted 🗑️");
            fetchQuestions();

        } catch {
            toast.error("Delete failed");
        }
    };

    // ================= EDIT =================
    const handleEdit = (q: Question) => {
        setEditForm(q);
        setEditId(q.id || null);
        setIsEditModalOpen(true);
    };

    // ================= UPDATE =================
    const handleUpdateConfirm = async () => {
        try {
            await axios.put(
                `${BASE_URI}/api/questions/${editId}`,
                editForm
            );

            setIsEditModalOpen(false);
            fetchQuestions();

            Swal.fire({
                icon: "success",
                title: "Updated!",
                timer: 1500,
                showConfirmButton: false
            });

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        }
    };

    // ================= BULK =================
    const handleBulkUpload = async () => {
        try {
            const parsed = JSON.parse(bulkJson);

            await axios.post(
                `${BASE_URI}/api/questions/bulk`,
                parsed
            );

            toast.success("Bulk upload success 🚀");
            setBulkJson("");
            fetchQuestions();

        } catch {
            toast.error("Invalid JSON ❌");
        }
    };
    const handleSetLimit = async () => {
        try {
            await axios.post(`${BASE_URI}/api/set-question-limit`, {
                limit: limit
            });

            toast.success("Question limit saved ✅");

        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Error");
        }
    };

    return (
        <div className="p-6">
            <Toaster position="top-right" />

            <h1 className="text-2xl font-bold mb-4">Manage Questions</h1>
            {/* LIMIT SET */}
            <div className="bg-white p-4 rounded shadow mb-6 flex items-center gap-3">

                <input
                    type="number"
                    className="border p-2 w-40"
                    placeholder="Enter limit"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                />

                <button
                    onClick={handleSetLimit}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Set Limit
                </button>

            </div>

            {/* MODE */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => setMode("single")}
                    className={`px-4 py-2 rounded ${mode === "single" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                >
                    Single Add
                </button>

                <button
                    onClick={() => setMode("bulk")}
                    className={`px-4 py-2 rounded ${mode === "bulk" ? "bg-purple-600 text-white" : "bg-gray-200"}`}
                >
                    Bulk Upload
                </button>
            </div>

            {/* ADD FORM */}
            {mode === "single" && (
                <div className="bg-white p-4 rounded shadow mb-6 grid gap-3">

                    <input className="border p-2" placeholder="Question"
                        value={addForm.question}
                        onChange={(e) => setAddForm({ ...addForm, question: e.target.value })}
                    />

                    <input className="border p-2" placeholder="Option 1"
                        value={addForm.option1}
                        onChange={(e) => setAddForm({ ...addForm, option1: e.target.value })}
                    />

                    <input className="border p-2" placeholder="Option 2"
                        value={addForm.option2}
                        onChange={(e) => setAddForm({ ...addForm, option2: e.target.value })}
                    />

                    <input className="border p-2" placeholder="Option 3"
                        value={addForm.option3}
                        onChange={(e) => setAddForm({ ...addForm, option3: e.target.value })}
                    />

                    <input className="border p-2" placeholder="Option 4"
                        value={addForm.option4}
                        onChange={(e) => setAddForm({ ...addForm, option4: e.target.value })}
                    />

                    <input className="border p-2" placeholder="Correct Answer (A/B/C/D)"
                        value={addForm.correct_answer}
                        onChange={(e) => setAddForm({ ...addForm, correct_answer: e.target.value })}
                    />

                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Question
                    </button>
                </div>
            )}

            {/* BULK */}
            {mode === "bulk" && (
                <div className="bg-white p-4 rounded shadow mb-6">

                    <textarea
                        className="border p-2 w-full h-40"
                        value={bulkJson}
                        onChange={(e) => setBulkJson(e.target.value)}
                        placeholder="Paste JSON..."
                    />

                    <button
                        onClick={handleBulkUpload}
                        className="bg-purple-600 text-white px-4 py-2 rounded mt-2"
                    >
                        Upload JSON
                    </button>
                </div>
            )}

            {/* LIST */}
            <div className="grid gap-4">
                {questions.map((q, i) => (
                    <div key={q.id} className="border p-4 rounded bg-gray-50">

                        <p className="font-semibold">Q{i + 1}. {q.question}</p>

                        <p>A. {q.option1}</p>
                        <p>B. {q.option2}</p>
                        <p>C. {q.option3}</p>
                        <p>D. {q.option4}</p>

                        <p className="text-green-600 mt-2">
                            Correct: {q.correct_answer}
                        </p>

                        <div className="flex gap-2 mt-3">
                            <button
                                onClick={() => handleEdit(q)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded"
                            >
                                Edit
                            </button>

                            <button
                                onClick={() => handleDelete(q.id!)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

            {/* EDIT MODAL */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

                    <div className="bg-white p-6 rounded w-[90%] max-w-lg">

                        <h2 className="text-xl font-bold mb-4">Edit Question</h2>

                        <input className="border p-2 w-full mb-2"
                            value={editForm.question}
                            onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                        />

                        <input className="border p-2 w-full mb-2"
                            value={editForm.option1}
                            onChange={(e) => setEditForm({ ...editForm, option1: e.target.value })}
                        />

                        <input className="border p-2 w-full mb-2"
                            value={editForm.option2}
                            onChange={(e) => setEditForm({ ...editForm, option2: e.target.value })}
                        />

                        <input className="border p-2 w-full mb-2"
                            value={editForm.option3}
                            onChange={(e) => setEditForm({ ...editForm, option3: e.target.value })}
                        />

                        <input className="border p-2 w-full mb-2"
                            value={editForm.option4}
                            onChange={(e) => setEditForm({ ...editForm, option4: e.target.value })}
                        />

                        <input className="border p-2 w-full mb-4"
                            value={editForm.correct_answer}
                            onChange={(e) => setEditForm({ ...editForm, correct_answer: e.target.value })}
                        />

                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleUpdateConfirm}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default Questions;