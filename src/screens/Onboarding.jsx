import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Onboarding() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [mobile, setMobile] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    grade: false,
    mobile: false,
  });
  const nav = useNavigate();

  const validName = name.trim().length >= 2;
  const validGrade = ["8", "9", "10", "11", "12"].includes(grade);
  const validMobile = /^\d{10}$/.test(mobile);
  const allValid = validName && validGrade && validMobile;

  return (
    <div className="max-w-3xl w-full grid grid-cols-1 gap-8">
      <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-extrabold text-gray-900">Path Finder</h1>
          <div className="ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-cyan-50 text-sm text-primary-700">
            Beta
          </div>
        </div>
        <p className="text-gray-600 italic">AI Powered Personal Career Guide</p>
        <div className="mt-2 w-full flex justify-start">
          <svg
            className="w-36 h-36"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="g1"
                x1="0"
                x2="1"
              >
                <stop
                  offset="0"
                  stopColor="#7c3aed"
                />
                <stop
                  offset="1"
                  stopColor="#06b6d4"
                />
              </linearGradient>
            </defs>
            <rect
              x="0"
              y="0"
              width="200"
              height="200"
              rx="20"
              fill="url(#g1)"
              opacity="0.12"
            />
            <g transform="translate(40,40)">
              <circle
                cx="50"
                cy="30"
                r="22"
                fill="#fff"
                opacity="0.95"
              />
              <rect
                x="8"
                y="70"
                rx="10"
                ry="10"
                width="84"
                height="34"
                fill="#fff"
                opacity="0.95"
              />
              <path
                d="M10 70 C 30 40, 70 40, 90 70"
                stroke="#7c3aed"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      <form
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (allValid) {
            localStorage.setItem("pf_user_details", JSON.stringify({ name, grade, mobile }));
            nav("/quiz");
          }
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Student Name
          </label>
          <div className="mt-2 relative">
            <input
              placeholder="Aisha R."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              className={`block w-full pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${touched.name
                ? validName
                  ? "border-green-300"
                  : "border-red-300"
                : "border-gray-200"
                } p-3 bg-white`}
            />
            <div className="absolute right-3 top-3">
              {touched.name && (validName ? "✅" : "❌")}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class <span className="text-gray-400 text-sm">(current)</span>
          </label>
          <div className="mt-2 flex items-center gap-2">
            <select
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
                setTouched((t) => ({ ...t, grade: true }));
              }}
              className={`rounded-lg border p-3 pr-8 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${touched.grade
                ? validGrade
                  ? "border-green-300"
                  : "border-red-300"
                : "border-gray-200"
                }`}
            >
              <option value="">Select grade</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <div className="relative group">
              <button
                type="button"
                className="p-2 rounded-full bg-gray-100 text-gray-600"
                aria-label="info"
              >
                ℹ️
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-44 hidden group-hover:block bg-white border border-gray-200 rounded-md p-2 text-xs text-gray-700 shadow-sm">
                Select current grade
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="mt-2 relative">
            <input
              inputMode="numeric"
              placeholder="9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/[^0-9]/g, ""))}
              onBlur={() => setTouched((t) => ({ ...t, mobile: true }))}
              className={`block w-full pr-10 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/40 transition ${touched.mobile
                ? validMobile
                  ? "border-green-300"
                  : "border-red-300"
                : "border-gray-200"
                } p-3 bg-white`}
            />
            <div className="absolute right-3 top-3">
              {touched.mobile && (validMobile ? "✅" : "❌")}
            </div>
          </div>
          {!validMobile && touched.mobile && (
            <p className="mt-2 text-sm text-red-600">
              Please enter a valid 10-digit mobile number
            </p>
          )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={!allValid}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${allValid
              ? "bg-gradient-to-r from-purple-500 to-cyan-500 hover:scale-105"
              : "bg-gray-300 cursor-not-allowed"
              }`}
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
}
