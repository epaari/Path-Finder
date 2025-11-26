import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./screens/Onboarding";

import Quiz from "./screens/Quiz";
import Confirmation from "./screens/Confirmation";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-4xl px-4">
          <Routes>
            <Route
              path="/"
              element={<Onboarding />}
            />

            <Route
              path="/quiz"
              element={<Quiz />}
            />
            <Route
              path="/confirmation"
              element={<Confirmation />}
            />
            <Route
              path="*"
              element={<Onboarding />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
