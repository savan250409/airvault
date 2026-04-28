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
    const [loading, setLoading] = useState(false);
    const [testCompleted, setTestCompleted] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    // const [questionsList, setQuestionsList] = useState([0]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(60);
    const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedOption, setSelectedOption] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        Swal.fire({
            title: "Aptitude Test Instructions",

            html: `
        <div style="text-align:left;font-size:14px;line-height:1.5;margin-top:5px;">
            
            <div style="
                background:#f9fafc;
                border-left:4px solid #E49F26;
                padding:10px 12px;
                border-radius:6px;
                margin-bottom:10px;
            ">
                📘 <b>This is an Aptitude Test</b>
            </div>

            <div style="margin-bottom:6px;">✔ Total <b>30 MCQ</b> Questions</div>
            <div style="margin-bottom:6px;">✔ Each question has <b>60 seconds</b></div>

            <div style="
                margin-top:10px;
                padding:8px 10px;
                border-radius:6px;
                background:#fff4e5;
                border:1px solid #E49F26;
                color:#a66a00;
                font-size:13px;
            ">
                ⚠ Once started, the test cannot be paused
            </div>

        </div>
    `,

            showCancelButton: true,
            confirmButtonText: "Start Test",
            cancelButtonText: "Cancel",

            confirmButtonColor: "#0D2DD0",
            cancelButtonColor: "#E49F26",

            customClass: {
                popup: "rounded-xl",
                title: "text-lg font-semibold",   // 👈 control title spacing
                htmlContainer: "mt-1"            // 👈 gap reduce
            }
        }).then(async (result) => {


            if (result.isConfirmed) {
                try {
                    setLoading(true);

                    const res = await axios.post(
                        `${BASE_URI}/api/internship`,
                        form
                    );

                    // 🔥 IMPORTANT FIX
                    if (!res.data.status) {
                        setLoading(false);

                        Swal.fire({
                            toast: true,
                            position: "top-end",
                            icon: "error",
                            title: res.data.message, // 👈 duplicate email yaha dikhega
                            showConfirmButton: false,
                            timer: 3000,
                        });

                        return; // 🚫 stop execution
                    }

                    // ✅ SUCCESS
                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "success",
                        title: "Form submitted successfully!",
                        showConfirmButton: false,
                        timer: 2000,
                    });

                    await fetchQuestionsFromAPI();

                    setSubmitted(true);
                    sessionStorage.setItem("testStarted", "true");
                    setLoading(false);

                } catch (error: any) {
                    setLoading(false);

                    let errorMessage = "Something went wrong";

                    if (error.response?.data?.message) {
                        errorMessage = error.response.data.message;
                    }

                    Swal.fire({
                        toast: true,
                        position: "top-end",
                        icon: "error",
                        title: errorMessage,
                        showConfirmButton: false,
                        timer: 3000,
                    });
                }
            } else {
                setLoading(false);
            }

        });
    };
    useEffect(() => {
        const testStarted = sessionStorage.getItem("testStarted");

        if (testStarted === "true") {
            // 🔥 cancel API call
            navigator.sendBeacon(
                `${BASE_URI}/api/internship/submit-test`,
                JSON.stringify({
                    email: form.email,
                    answers: "canceled"
                })
            );

            // cleanup
            sessionStorage.removeItem("testStarted");
        }
    }, []);
    // ✅ TIMER
    // useEffect(() => {
    //     if (!submitted) return;

    //     if (timeLeft === 0) {
    //         if (currentIndex === questions.length - 1) {
    //             handleFinalSubmit();
    //         } else {
    //             handleNext();
    //         }
    //         return;
    //     }
    //     const timer = setTimeout(() => {
    //         setTimeLeft((prev) => prev - 1);
    //     }, 1000);

    //     return () => clearTimeout(timer);
    // }, [timeLeft, submitted, currentIndex]);

    useEffect(() => {
    if (!submitted) return;

    if (timeLeft === 0) {
        handleAutoSkip(); // 🔥 NEW
        return;
    }

    const timer = setTimeout(() => {
        setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
}, [timeLeft, submitted, currentIndex]);

    useEffect(() => {
        if (!submitted || testCompleted) return;

        const handleBeforeUnload = (e) => {
            e.preventDefault();

            // 🔥 cancel API call
            navigator.sendBeacon(
                `${BASE_URI}/api/internship/submit-test`,
                JSON.stringify({
                    email: form.email,
                    answers: "canceled"
                })
            );

            e.returnValue = "";
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [submitted, testCompleted]);

    useEffect(() => {
        if (!submitted) return;

        const handlePopState = (e) => {
            e.preventDefault();

            Swal.fire({
                title: "Exit Test?",
                html: `
                <p>You are about to leave the test.</p>
                <p><b>Your progress will be lost and marked as cancelled.</b></p>
            `,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Exit Test",
                cancelButtonText: "Continue Test",
            }).then((result) => {
                if (result.isConfirmed) {
                    handleCancelTest(); // 🔥 API CALL
                } else {
                    window.history.pushState(null, "", window.location.href);
                }
            });
        };

        window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, [submitted]);


    // ✅ SELECT
    const handleSelect = (qIndex, opt) => {
        if (lockedQuestions[qIndex]) return;

        setAnswers((prev) => ({
            ...prev,
            [qIndex]: opt,
        }));
    };

    // ✅ FINAL SUBMIT (TOAST ONLY)
    const handleCancelTest = async () => {
        try {
            await axios.post(`${BASE_URI}/api/internship/submit-test`, {
                email: form.email,
                answers: "canceled"
            });

            Swal.fire({
                icon: "info",
                title: "Test Cancelled",
                text: "Your test has been cancelled successfully.",
            }).then(() => {
                window.location.href = "/";
            });

        } catch (err) {
            console.log(err);
        }
    };
    const handleFinish = () => {

        // ❌ Agar last question ka answer nahi hai ya skip nahi kiya
        if (!answers[currentIndex]) {
            Swal.fire({
                icon: "warning",
                title: "Please select an option or skip",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

        handleFinalSubmit();
    };

    const handleFinalSubmit = async () => {
        setShowConfetti(true);
        setTestCompleted(true);
        sessionStorage.removeItem("testStarted");
        setTimeout(() => {
            setShowConfetti(false);
        }, 4000);

        try {
            const formattedAnswers = {};

            questions.forEach((q, index) => {
                formattedAnswers[q.question] = answers[index] || "Skipped";
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
                icon: "success",

                title: "🎉 Success",

                html: `
        <div style="text-align:center;font-size:14px;color:#333;line-height:1.5;">
            
            <p style="margin:6px 0;">
                ✅ Thank you for completing the test
            </p>

            <p style="margin:6px 0;">
                🎯 <b>Congratulations!</b> Your test is submitted
            </p>

            <div style="
                background:#fff4e5;
                border:1px solid #E49F26;
                padding:10px;
                border-radius:6px;
                margin-top:10px;
                color:#a66a00;
                font-size:13px;
            ">
                📞 Our support team will contact you soon
            </div>

        </div>
    `,

                confirmButtonText: "Done",
                confirmButtonColor: "#0D2DD0",

                allowOutsideClick: false,
                allowEscapeKey: false,

                customClass: {
                    popup: "rounded-xl p-3",
                    title: "text-lg font-semibold !mt-2 !mb-1",  // 👈 spacing control
                    htmlContainer: "!mt-1",
                    confirmButton: "mt-2"
                }
            }).then((result) => {
                if (result.isConfirmed) {

                    // ✅ mark completed
                    setTestCompleted(true);

                    // ✅ remove unload
                    window.onbeforeunload = null;

                    // 👉 redirect
                    window.location.href = "/";
                }
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

        // ❌ Agar answer select nahi hai
        if (!answers[currentIndex]) {
            Swal.fire({
                icon: "warning",
                title: "Please select an option or skip",
                timer: 1500,
                showConfirmButton: false
            });
            return;
        }

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

    const handleSkip = () => {

        // skip mark (optional)
        setAnswers((prev) => ({
            ...prev,
            [currentIndex]: "Skipped"
        }));

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

    const handleAutoSkip = () => {

    // agar answer already diya hai → normal next
    if (answers[currentIndex]) {
        handleNext();
        return;
    }

    // ❗ answer nahi hai → auto skip
    setAnswers((prev) => ({
        ...prev,
        [currentIndex]: "Skipped"
    }));

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
            {loading && (
                <div className="fixed inset-0 bg-white bg-opacity-70 flex justify-center items-center z-50">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
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

            <div className="min-h-screen bg-[#f5f7f] py-10 px-6">
                <div className="w-full bg-white rounded-xl ">

                    {/* PAGE HEADER */}
                    {/* <div className="bg-[#0057b8] text-white px-8 py-6 rounded-t-xl">
                        <h1 className="text-xl font-semibold">Internship Application</h1>
                    </div> */}
  <div className="bg-white py-0">  {/* 👉 Parent background white */}

  {/* SECTION 1 */}
 {/* SECTION 1 */}
{!submitted && (
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-white p-4 rounded-xl border shadow-sm ">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b8c] mb-4">
           ✈️ Why Choose Airvault for Internship?
          </h2>

          <p className="text-gray-600 mb-6 text-sm md:text-base leading-relaxed max-w-md">
            At Airvault, we focus on helping interns grow with real experience and practical learning. Our internship program is designed to give you industry knowledge, confidence, and skills that will help in your future career.
          </p>

          <ul className="space-y-3 text-gray-700 text-sm md:text-base">
          <li className="flex items-start gap-3">
   <span className="text-[#E5A121] text-lg">✔</span> 
   <p>Work on real-time projects and gain practical experience</p>
</li>
<li className="flex items-start gap-3">
   <span className="text-[#E5A121] text-lg">✔</span> 
   <p>Learn industry processes in aviation and logistics</p>
</li>
<li className="flex items-start gap-3">
   <span className="text-[#E5A121] text-lg">✔</span> 
   <p>Get guidance from experienced team members</p>
</li>
<li className="flex items-start gap-3">
   <span className="text-[#E5A121] text-lg">✔</span> 
   <p>Build confidence and improve communication skills</p>
</li>
<li className="flex items-start gap-3">
   <span className="text-[#E5A121] text-lg">✔</span> 
   <p>Opportunity to grow and explore full-time career options</p>
</li>



           
          </ul>
        </div>

        {/* RIGHT IMAGE */}
        <div className="relative flex justify-center md:justify-end">
          <img
            src="/uploads/service/image/intership_form.png"
            alt="Internship"
            className="w-full h-[350px] md:h-[450px] rounded-2xl shadow-lg object-cover"
          />
          <div className="absolute -bottom-3 -left-12 w-24 h-24 bg-[#E5A121] rounded-xl opacity-30 "></div>
        </div>

      </div>
    </div>
  </div>
)}
  {/* 👉 GAP (clean white space) */}
  <div className="h-8"></div>

  {/* SECTION 2 */}
  <div className="max-w-7xl mx-auto px-6">
    <div className="bg-[#FFF4E6] border border-[#eca53a] py-4 px-6 rounded-xl flex flex-col md:flex-row md:justify-between md:items-center gap-3">

      {/* LEFT CONTENT */}
      <div>
        <h2 className="font-semibold text-sm mb-1">
          Internship Application & Aptitude Test
        </h2>
        <p className="text-xs text-gray-600">
          This test evaluates your knowledge of air freight, logistics, and supply chain concepts.
        </p>
      </div>

      {/* ⏱ TIMER */}
     {submitted && !testCompleted && (
  <div className="text-right">
    <p className="text-sm text-gray-700">Time Left</p>
    <p className="text-xl font-bold text-red-600">⏱ {timeLeft}s</p>
  </div>
)}

    </div>
  </div>

</div>

                    {/* <div className="bg-[#eca53a] text-white px-6 py-2 text-xs">
                        ⭐ Eligibility clause: Only candidates scoring <b>30 or above out of 40</b> are eligible.
                    </div> */}
                    {submitted && (
                        <div className="px-6 py-2 flex justify-end text-lg font-semibold text-gray-700">
                            {currentIndex + 1} / {questions.length}
                        </div>
                    )}

                    {!submitted && (
                        <form onSubmit={handleSubmit} className="p-8 max-w-7xl mx-auto px-6">
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
                                        required
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
                                        required
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
                                        className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
                                        required
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
                                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d2dd0]"
                                    required
                                />
                            </div>

                            {/* BUTTON */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    disabled={submitted}
                                    className={`px-8 py-3 rounded-lg text-white 
${submitted ? "bg-gray-400 cursor-not-allowed" : "bg-[#0d2dd0] hover:bg-[#0a24a8]"}`}
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
                                                ? "bg-[#EEF2FF] border-[#0d2dd0]"
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
                                {/* <div className="flex justify-end mt-6">


                                    <button
                                        onClick={currentIndex === questions.length - 1 ? handleFinalSubmit : handleNext}
                                        className="bg-[#eca53a] hover:bg-[#e67600] text-white px-5 py-2 rounded"
                                    >
                                        {currentIndex === questions.length - 1 ? "Finish" : "Next →"}
                                    </button>
                                </div> */}
                                <div className="flex justify-between mt-6">

                                    {/* LEFT - SKIP */}
                                    <button
                                        onClick={handleSkip}
                                        className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded"
                                    >
                                        ⏭ Skip
                                    </button>

                                    {/* RIGHT - NEXT */}
                                    <button
                                        onClick={currentIndex === questions.length - 1 ? handleFinish : handleNext}
                                        className="bg-[#eca53a] hover:bg-[#e67600] text-white px-5 py-2 rounded"
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