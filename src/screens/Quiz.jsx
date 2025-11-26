import { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import OptionCard from "../components/OptionCard";
import OfflineBadge from "../components/OfflineBadge";
import { useNavigate } from "react-router-dom";

const QUESTIONS = [
  { id: 1, code: "R", text: "I enjoy repairing small things at home like a toy or school projects." },
  { id: 2, code: "R", text: "I like assembling items by following steps, like setting up a small table or stand." },
  { id: 3, code: "R", text: "I enjoy learning how machines work, like mixer grinders or bicycles." },
  { id: 4, code: "R", text: "I like helping at home with simple household tools like screwdrivers." },
  { id: 5, code: "R", text: "I feel confident using basic tools for school craft or science projects." },
  { id: 6, code: "R", text: "I enjoy planting and taking care of small plants at home or school." },
  { id: 7, code: "R", text: "I like organizing things neatly in a cupboard, shelf, or school bag." },
  { id: 8, code: "R", text: "I enjoy tasks where I can work with my hands, like making models or fixing things." },
  { id: 9, code: "R", text: "I like exploring how electrical or electronic items work." },
  { id: 10, code: "R", text: "I enjoy trying new do-it-yourself activities seen on YouTube or Instagram." },
  { id: 11, code: "I", text: "I enjoy solving puzzles that need thinking, like Sudoku or logic puzzles." },
  { id: 12, code: "I", text: "I like finding out how things work by reading or watching videos." },
  { id: 13, code: "I", text: "I enjoy science experiments in school or at home." },
  { id: 14, code: "I", text: "I like asking \"why\" things happen and searching for answers." },
  { id: 15, code: "I", text: "I enjoy reading or watching content about space, nature, or technology." },
  { id: 16, code: "I", text: "I like comparing information to understand which is correct." },
  { id: 17, code: "I", text: "I enjoy planning steps to solve a maths or science problem." },
  { id: 18, code: "I", text: "I like watching educational videos on topics like health, environment or inventions." },
  { id: 19, code: "I", text: "I enjoy analysing data in charts or tables given in textbooks." },
  { id: 20, code: "I", text: "I like finding solutions when something is confusing or unclear." },
  { id: 21, code: "A", text: "I enjoy drawing, sketching, or designing things in my notebook." },
  { id: 22, code: "A", text: "I like arranging colours, patterns, or decorations neatly." },
  { id: 23, code: "A", text: "I enjoy writing stories, poems, or creative captions." },
  { id: 24, code: "A", text: "I like making creative craft items using paper, cloth, or waste materials." },
  { id: 25, code: "A", text: "I enjoy thinking of new ideas for school projects." },
  { id: 26, code: "A", text: "I like listening to music and imagining scenes or emotions." },
  { id: 27, code: "A", text: "I enjoy acting, storytelling, or expressing feelings creatively." },
  { id: 28, code: "A", text: "I like choosing outfits and matching colours for family events or school programs." },
  { id: 29, code: "A", text: "I enjoy creating videos or reels using my phone (or imagining how I would)." },
  { id: 30, code: "A", text: "I like decorating my study table, cupboard, or school notebooks." },
  { id: 31, code: "S", text: "I enjoy helping my classmates when they have doubts." },
  { id: 32, code: "S", "text": "I like taking care of younger children in my family or neighbourhood." },
  { id: 33, code: "S", text: "I feel happy when I can support a friend who is upset." },
  { id: 34, code: "S", text: "I enjoy participating in school events where teamwork is needed." },
  { id: 35, code: "S", text: "I like teaching simple things to others when I understand them well." },
  { id: 36, code: "S", text: "I enjoy volunteering in school activities like cleaning drives or awareness programs." },
  { id: 37, code: "S", text: "I feel comfortable talking to new people or welcoming guests." },
  { id: 38, code: "S", text: "I enjoy working with groups rather than working alone." },
  { id: 39, code: "S", text: "I like helping teachers during school programs or functions." },
  { id: 40, code: "S", text: "I enjoy planning small celebrations or group activities with friends." },
  { id: 41, code: "E", text: "I enjoy taking the lead when my group has a project." },
  { id: 42, code: "E", text: "I like giving suggestions and ideas during discussions." },
  { id: 43, code: "E", text: "I enjoy motivating others to participate or complete tasks." },
  { id: 44, code: "E", text: "I like planning how a group activity should be done." },
  { id: 45, code: "E", text: "I feel confident speaking in front of a class or group." },
  { id: 46, code: "E", text: "I enjoy organising events like class birthdays or small functions." },
  { id: 47, code: "E", text: "I like convincing others politely when I believe my idea is good." },
  { id: 48, code: "E", text: "I enjoy participating in debates or speeches." },
  { id: 49, code: "E", text: "I like taking responsibility when something important needs to be done." },
  { id: 50, code: "E", text: "I enjoy thinking about ways to start small activities like selling handmade crafts or snacks." },
  { id: 51, code: "C", text: "I enjoy arranging my study materials neatly before starting work." },
  { id: 52, code: "C", text: "I like making to-do lists and completing tasks one by one." },
  { id: 53, code: "C", text: "I enjoy keeping my notebooks clean and well-organised." },
  { id: 54, code: "C", text: "I like checking my homework or notes for mistakes." },
  { id: 55, code: "C", text: "I enjoy entering data or writing information neatly in tables." },
  { id: 56, code: "C", text: "I like following rules and instructions carefully." },
  { id: 57, code: "C", text: "I enjoy sorting items at home, like clothes, books, or groceries." },
  { id: 58, code: "C", text: "I like finishing tasks before the deadline." },
  { id: 59, code: "C", text: "I enjoy keeping records of expenses or pocket money." },
  { id: 60, code: "C", text: "I like doing step-by-step tasks such as filing papers or arranging documents." },
];

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
    if (current < questions.length - 1) setCurrent((c) => c + 1);
    else nav("/confirmation");
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
