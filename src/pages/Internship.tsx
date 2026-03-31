import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URI from "@/config";
import Confetti from "react-confetti";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Internship = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        college: "",
        degree: "",
        city: "",
        motivation: "",
    });

    const [submitted, setSubmitted] = useState(false);
    // const [questionsList, setQuestionsList] = useState([0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [lockedQuestions, setLockedQuestions] = useState({});
    const [showConfetti, setShowConfetti] = useState(false);

    const [questions, setQuestions] = useState<any[]>([]);
    const [questionLimit, setQuestionLimit] = useState(0);
    // const currentIndex = questionsList.length - 1;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const fetchQuestionsFromAPI = async () => {
        try {
            const res = await axios.get(`${BASE_URI}/api/questions`);

            const allQuestions = res.data.data || [];
            const limit = res.data.question_limit || 0;

            // 🔥 transform
            const formatted = allQuestions.map((q: any) => ({
                question: q.question,
                options: [
                    q.option1,
                    q.option2,
                    q.option3,
                    q.option4
                ]
            }));

            // 🔥 RANDOM SHUFFLE (Fisher-Yates)
            for (let i = formatted.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [formatted[i], formatted[j]] = [formatted[j], formatted[i]];
            }

            // 👉 limit apply AFTER shuffle
            const limitedQuestions = formatted.slice(0, limit);

            setQuestions(limitedQuestions);

        } catch (err) {
            console.log(err);
            Swal.fire("Error", "Failed to load questions", "error");
        }
    };
    // ✅ FORM SUBMIT (NO REDIRECT)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(`${BASE_URI}/api/internship`, form);

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Form submitted!",
                showConfirmButton: false,
                timer: 2000,
            });
            setTimeout(() => {
                Swal.fire({
                    icon: "info",
                    title: "Aptitude Test Instructions",
                    html: `
            <p>This is an Aptitude Test.</p>
            <p>Total <b>30 MCQ</b> questions.</p>
            <p>Click <b>OK</b> to start the test.</p>
        `,
                    confirmButtonText: "OK"
                }).then(async () => {
                    await fetchQuestionsFromAPI(); // ✅ pehle data load
                    setSubmitted(true); // ✅ phir test start
                });
            }, 2000);

            // setSubmitted(true);

        } catch (error) {

            let errorMessage = "Error submitting form";

            // ✅ Backend se actual message lo
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: errorMessage,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

    // ✅ TIMER
    useEffect(() => {
        if (!submitted) return;

        if (timeLeft === 0) {
            if (currentIndex === questions.length - 1) {
                handleFinalSubmit();
            } else {
                handleNext();
            }
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, submitted, currentIndex]);

    // ✅ SELECT
    const handleSelect = (qIndex, opt) => {
        if (lockedQuestions[qIndex]) return;

        setAnswers((prev) => ({
            ...prev,
            [qIndex]: opt,
        }));
    };

    // ✅ FINAL SUBMIT (TOAST ONLY)
    const handleFinalSubmit = async () => {
        setShowConfetti(true);

        setTimeout(() => {
            setShowConfetti(false);
        }, 4000);

        try {
            const formattedAnswers = {};

            questions.forEach((q, index) => {
                formattedAnswers[q.question] = answers[index] || "None";
            });

            const isAlreadySubmitted = false; // backend ya state se decide karo

            const method = isAlreadySubmitted ? "PUT" : "POST";

            await axios({
                method: method,
                url: `${BASE_URI}/api/internship/submit-test`,
                data: {
                    email: form.email,
                    answers: formattedAnswers,
                }
            });

            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Test submitted successfully!",
                showConfirmButton: false,
                timer: 4000,
            }).then(() => {
                window.location.href = "/";
            });

        } catch {
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Submit failed",
                timer: 2000,
            });
        }
    };
    // ✅ NEXT
    const handleNext = () => {

        setLockedQuestions((prev) => ({
            ...prev,
            [currentIndex]: true,
        }));

        setTimeLeft(60);

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleFinalSubmit();
        }
    };
    return (
        <>
            {/* 🎉 CONFETTI TOP PE */}
            {showConfetti && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                    numberOfPieces={400}
                    recycle={false}
                />
            )}

            {/* GLOBAL HEADER */}
            {!submitted && <Header />}

            <div className="min-h-screen bg-[#f5f7fc] py-10 px-6">
                <div className="w-full bg-white rounded-xl shadow">

                    {/* PAGE HEADER */}
                    {/* <div className="bg-[#0057b8] text-white px-8 py-6 rounded-t-xl">
                        <h1 className="text-xl font-semibold">Internship Application</h1>
                    </div> */}
                    <div className="bg-blue-700 text-white p-6 rounded-t-xl">
                        <div className="flex justify-between items-center">

                            {/* LEFT SIDE */}
                            <div>
                                <h1 className="text-lg font-bold">Airvault Express</h1>
                                <p className="text-xs opacity-80">AND LOGISTICS PVT. LTD.</p>
                            </div>

                            {/* RIGHT SIDE TIMER */}
                            {submitted && (
                                <div className="text-right">
                                    <p className="text-sm">Time Left</p>
                                    <p className="text-2xl font-bold">⏱ {timeLeft}s</p>
                                </div>
                            )}

                        </div>
                    </div>

                    <div className="bg-yellow-50 border px-6 py-4">
                        <h2 className="font-semibold text-sm mb-1">
                            Internship Application & Aptitude Test
                        </h2>
                        <p className="text-xs text-gray-600">
                            This test evaluates your knowledge of air freight, logistics, and supply chain concepts.
                        </p>
                    </div>

                    <div className="bg-yellow-100 px-6 py-2 text-xs">
                        ⭐ Eligibility clause: Only candidates scoring <b>30 or above out of 40</b> are eligible.
                    </div>
                    {submitted && (
                        <div className="px-6 py-2 flex justify-end text-lg font-semibold text-gray-700">
                            {currentIndex + 1} / {questions.length}
                        </div>
                    )}
                    {/* FORM */}
                    {/* <form onSubmit={handleSubmit} className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name" className="p-3 border rounded-lg" required />
                            <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 border rounded-lg" required />
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={(e) => {
                                    // ✅ sirf number allow
                                    const value = e.target.value.replace(/\D/g, "");
                                    setForm({ ...form, phone: value });
                                }}
                                placeholder="+91 XXXXX XXXXX"
                                maxLength={10}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className="p-3 border rounded-lg"
                                required
                            />
                            <input name="college" value={form.college} onChange={handleChange} placeholder="College" className="p-3 border rounded-lg" />
                            <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree" className="p-3 border rounded-lg" />
                            <input name="city" value={form.city} onChange={handleChange} placeholder="City" className="p-3 border rounded-lg" />
                        </div>

                        <textarea name="motivation" value={form.motivation} onChange={handleChange} className="w-full mt-4 p-3 border rounded-lg" placeholder="Motivation"></textarea>

                        <div className="mt-6 flex justify-end">
                            <button
                                disabled={submitted}
                                className={`px-8 py-3 rounded-lg text-white 
                            ${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-[#0057b8]"}`}
                            >
                                Continue →
                            </button>
                        </div>
                    </form> */}
                    {!submitted && (
                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                {/* NAME */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Enter your full name"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* EMAIL */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email address"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* PHONE */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Mobile Number <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        name="phone"
                                        value={form.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, "");
                                            if (value.length <= 10) {
                                                setForm({ ...form, phone: value });
                                            }
                                        }}
                                        placeholder="+91 XXXXX XXXXX"
                                        maxLength={10}
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {/* COLLEGE */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        College / University
                                    </label>
                                    <input
                                        name="college"
                                        value={form.college}
                                        onChange={handleChange}
                                        placeholder="Enter your college name"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* DEGREE */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        Degree
                                    </label>
                                    <input
                                        name="degree"
                                        value={form.degree}
                                        onChange={handleChange}
                                        placeholder="e.g. B.Tech, BBA, MBA"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* CITY */}
                                <div className="flex flex-col">
                                    <label className="mb-1 text-sm font-medium">
                                        City
                                    </label>
                                    <input
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                            </div>

                            {/* MOTIVATION */}
                            <div className="mt-4 flex flex-col">
                                <label className="mb-1 text-sm font-medium">
                                    Motivation
                                </label>
                                <textarea
                                    name="motivation"
                                    value={form.motivation}
                                    onChange={handleChange}
                                    placeholder="Tell us why you want this internship..."
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    disabled={submitted}
                                    className={`px-8 py-3 rounded-lg text-white 
${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-[#0057b8] hover:bg-blue-700"}`}
                                >
                                    Start Test →
                                </button>
                            </div>
                        </form>
                    )}

                    {/* QUIZ */}
                    {submitted && (
                        // <div className="flex justify-center items-center min-h-[60vh]">
                        <div className="flex justify-center items-start min-h-[60vh] px-10 py-6">

                            <div className="w-full max-w-2xl border rounded-xl p-6 bg-white shadow">

                                <p className="mb-4 font-medium text-left">
                                    {questions[currentIndex].question}
                                </p>

                                {/* Options */}
                                <div className="grid gap-3">
                                    {questions[currentIndex].options.map((opt, i) => (
                                        <label
                                            key={i}
                                            className={`p-3 border rounded-lg cursor-pointer text-left flex items-center gap-3 ${answers[currentIndex] === opt
                                                ? "bg-blue-50 border-blue-500"
                                                : ""
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                checked={answers[currentIndex] === opt}
                                                onChange={() => handleSelect(currentIndex, opt)}
                                            />
                                            <span>{opt}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Bottom */}
                                <div className="flex justify-end mt-6">


                                    <button
                                        onClick={currentIndex === questions.length - 1 ? handleFinalSubmit : handleNext}
                                        className="bg-[#0057b8] text-white px-5 py-2 rounded"
                                    >
                                        {currentIndex === questions.length - 1 ? "Finish" : "Next →"}
                                    </button>
                                </div>

                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* GLOBAL FOOTER */}
            {!submitted && <Footer />}
        </>
    );
};

export default Internship;