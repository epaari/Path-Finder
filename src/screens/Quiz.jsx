import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionCard from "../components/OptionCard";
import OfflineBadge from "../components/OfflineBadge";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  {
    id: 1,
    text: "Which subject do you enjoy the most?",
    options: [
      "Mathematics and problem solving",
      "Arts & literature",
      "Science and experiments",
      "Computers and coding",
    ],
  },
  {
    id: 2,
    text: "How do you prefer to learn?",
    options: [
      "By doing hands-on projects",
      "By reading and writing",
      "By observing experiments",
      "By building software/tools",
    ],
  },
  {
    id: 3,
    text: "Which environment appeals to you?",
    options: [
      "A lab or research setting",
      "A studio or creative space",
      "A fast-moving tech team",
      "A classroom or school",
    ],
  },
];

const STORAGE_KEY = "pf_quiz_answers_v1";

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [online, setOnline] = useState(navigator.onLine);
  const nav = useNavigate();

  useEffect(() => {
    function onOnline() {
      setOnline(true);
      syncAnswers();
    }
    function onOffline() {
      setOnline(false);
    }
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    // load saved
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setAnswers(parsed.answers || {});
        setCurrent(parsed.current || 0);
      } catch (err) {
        console.warn("Failed to parse saved quiz answers", err);
      }
    }
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    // persist whenever answers/current change
    const payload = { answers, current };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, current]);

  function syncAnswers() {
    // Demo: pretend to sync; in real app send to backend.
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      console.log("Syncing saved answers...", JSON.parse(raw));
      // after sync we could clear a flag; keep local copy for demo
    }
  }

  function selectOption(qIdx, optIdx) {
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
  }

  function goNext() {
    if (current < QUESTIONS.length - 1) setCurrent((c) => c + 1);
    else nav("/confirmation");
  }

  function goPrev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  const q = QUESTIONS[current];

  return (
    <div className="max-w-3xl w-full relative pb-28">
      <TopBar
        center={
          <div className="text-sm">
            Question {current + 1} / {QUESTIONS.length}{" "}
            <div className="h-1 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                style={{
                  width: `${((current + 1) / QUESTIONS.length) * 100}%`,
                }}
                className="h-1 bg-gradient-to-r from-purple-500 to-cyan-400"
              />
            </div>
          </div>
        }
        left={<OfflineBadge online={online} />}
      />

      <div className="mt-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div
            style={{ fontSize: 20 }}
            className="text-gray-900 font-semibold"
          >
            {q.text}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {q.options.map((opt, i) => {
            const selected = answers[current] === i;
            const letter = String.fromCharCode(65 + i);
            return (
              <OptionCard
                key={i}
                letter={letter}
                text={opt}
                selected={selected}
                onClick={() => selectOption(current, i)}
              />
            );
          })}
        </div>
      </div>

      {/* bottom fixed nav */}
      <div className="fixed left-0 right-0 bottom-4 flex justify-center">
        <div className="w-full max-w-3xl px-6">
          <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow">
            <button
              onClick={goPrev}
              disabled={current === 0}
              className={`px-4 py-2 rounded-lg ${
                current === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              Previous
            </button>
            <div className="flex-1 text-center text-sm text-gray-600">
              {online ? "Connected" : "You are offline — answers saved locally"}
            </div>
            <button
              onClick={goNext}
              className={`px-4 py-2 rounded-lg ${
                current === QUESTIONS.length - 1
                  ? "bg-primary text-white"
                  : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
              }`}
            >
              {current === QUESTIONS.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
