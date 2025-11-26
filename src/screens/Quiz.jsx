import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionCard from "../components/OptionCard";
import OfflineBadge from "../components/OfflineBadge";
import { useNavigate } from "react-router-dom";

import { QUESTIONS } from "../data/questions";
import { calculateRiasecScore } from "../utils/riasecScoring";

const OPTIONS = ["Yes", "No"];

const STORAGE_KEY = "pf_quiz_answers_v2";

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function Quiz() {
  const [questions, setQuestions] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed.questionOrder && parsed.questionOrder.length === QUESTIONS.length) {
          const ordered = parsed.questionOrder
            .map((id) => QUESTIONS.find((q) => q.id === id))
            .filter(Boolean);
          if (ordered.length === QUESTIONS.length) return ordered;
        }
      } catch (err) {
        console.warn("Failed to parse saved quiz order", err);
      }
    }
    return shuffle([...QUESTIONS]);
  });

  const [current, setCurrent] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return parsed.current || 0;
      } catch (err) { }
    }
    return 0;
  });

  const [answers, setAnswers] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return parsed.answers || {};
      } catch (err) { }
    }
    return {};
  });

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
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useEffect(() => {
    const payload = {
      answers,
      current,
      questionOrder: questions.map((q) => q.id),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, current, questions]);

  function syncAnswers() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      console.log("Syncing saved answers...", JSON.parse(raw));
    }
  }

  function selectOption(qIdx, optIdx) {
    setAnswers((a) => ({ ...a, [qIdx]: optIdx }));
  }

  function goNext() {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      // Calculate and log score
      const userResponses = {};
      questions.forEach((q, idx) => {
        const ans = answers[idx];
        if (ans !== undefined) {
          // Option 0 is Yes (1), Option 1 is No (0)
          userResponses[q.id] = ans === 0 ? 1 : 0;
        }
      });

      const result = calculateRiasecScore(userResponses, QUESTIONS);
      console.log("RIASEC Scoring Result:", JSON.stringify(result, null, 2));

      nav("/confirmation");
    }
  }

  function goPrev() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  const q = questions[current];

  return (
    <div className="max-w-3xl w-full relative pb-28">
      <TopBar
        center={
          <div className="text-sm">
            Question {current + 1} / {questions.length}{" "}
            <div className="h-1 bg-gray-200 rounded mt-2 overflow-hidden">
              <div
                style={{
                  width: `${((current + 1) / questions.length) * 100}%`,
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
          {OPTIONS.map((opt, i) => {
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
              className={`px-4 py-2 rounded-lg ${current === 0
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
              className={`px-4 py-2 rounded-lg ${current === questions.length - 1
                ? "bg-primary text-white"
                : "bg-gradient-to-r from-purple-500 to-cyan-500 text-white"
                }`}
            >
              {current === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
