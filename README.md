# Path Finder

Path Finder is a career guidance application designed to help users discover their professional interests through a comprehensive quiz based on the RIASEC model.

## Features

- **Interactive Quiz**: A 60-question assessment based on the RIASEC codes (Realistic, Investigative, Artistic, Social, Enterprising, Conventional).
- **Randomized Questions**: Questions are shuffled for every new session to ensure a fresh experience, with the order persisted to avoid repetition during a single session.
- **Progress Saving**: User progress and answers are automatically saved to local storage, allowing users to resume where they left off even if they go offline or refresh the page.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Offline Support**: Detects network status and allows the quiz to continue offline, syncing when the connection is restored (simulated).
- **RIASEC Scoring**: Automatically calculates the user's Holland Code (3-letter code) and provides a detailed score breakdown upon completion.
- **Google Sheets Integration**: Submits user details (Name, Grade, Mobile) and quiz answers to a Google Sheet for data collection and analysis.

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Backend**: Google Apps Script (for Sheets integration)

## Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```

3.  **Build for Production**:
    ```bash
    npm run build
    ```

## Recent Updates

- **[2025-11-25] Quiz Content**: Updated the quiz to include 60 detailed questions mapping to RIASEC themes.
- **[2025-11-25] Question Logic**: Implemented a Fisher-Yates shuffle algorithm to randomize question order on initialization.
- **[2025-11-25] Persistence**: Enhanced local storage logic to persist the specific randomized order of questions alongside user answers (`pf_quiz_answers_v2`).
- **[2025-11-26] Streamlined Flow**: Removed the payment screen to allow direct access to the quiz from the onboarding page.
- **[2025-11-26] Scoring Module**: Implemented robust RIASEC scoring logic with deterministic tie-breaking and detailed result calculation.
- **[2025-11-26] Testing Mode**: Added a `USE_SHORT_QUIZ` toggle in `src/data/questions.js` to enable a 10-question version for rapid testing.
- **[2025-11-26] Data Collection**: Integrated Google Sheets to capture student data and responses upon quiz submission.
