import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Confirmation() {
  const nav = useNavigate();

  useEffect(() => {
    // clear saved answers after submission (demo)
    try {
      localStorage.removeItem("pf_quiz_answers_v1");
    } catch (err) {
      console.warn("Failed clearing storage", err);
    }
  }, []);

  return (
    <div className="max-w-3xl w-full">
      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold">Test submitted successfully!</h2>
        <p className="mt-2 text-gray-600">
          Your report will be sent to your WhatsApp number shortly.
        </p>
        <div className="mt-6">
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
            onClick={() => nav("/")}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
