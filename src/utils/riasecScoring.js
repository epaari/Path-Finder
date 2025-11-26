/**
 * Calculates the RIASEC score based on user responses.
 *
 * @param {Object} userResponses - Object mapping question ID to response value (1 for Yes, 0 for No).
 * @param {Array} questionsData - Array of question objects with 'id' and 'code'.
 * @returns {Object} - The scoring result including breakdown, hollandCode, ranked scores, totalYes, and warnings.
 */
export function calculateRiasecScore(userResponses, questionsData) {
    const scores = {
        R: { raw: 0, total: 0 },
        I: { raw: 0, total: 0 },
        A: { raw: 0, total: 0 },
        S: { raw: 0, total: 0 },
        E: { raw: 0, total: 0 },
        C: { raw: 0, total: 0 },
    };

    const warnings = [];
    let totalYes = 0;

    // Track which questions we've seen to detect missing ones later
    const processedQuestionIds = new Set();

    // First pass: Process all questions in the data
    questionsData.forEach((q) => {
        if (!scores[q.code]) {
            // Should not happen given the fixed codes, but good for safety
            return;
        }

        scores[q.code].total += 1;
        processedQuestionIds.add(q.id);

        const response = userResponses[q.id];

        if (response === undefined) {
            warnings.push(`Missing response for question ID ${q.id}. Treating as No.`);
        } else if (response === 1) {
            scores[q.code].raw += 1;
            totalYes += 1;
        } else if (response !== 0) {
            warnings.push(`Invalid response value '${response}' for question ID ${q.id}. Treating as No.`);
        }
    });

    // Check for unknown question IDs in userResponses
    Object.keys(userResponses).forEach((idStr) => {
        const id = parseInt(idStr, 10);
        if (!processedQuestionIds.has(id)) {
            warnings.push(`Ignored unknown question ID ${id} in responses.`);
        }
    });

    // Calculate percentages and format the breakdown
    const breakdown = {};
    const ranked = [];

    Object.keys(scores).forEach((code) => {
        const { raw, total } = scores[code];
        let percent = 0.0;
        if (total > 0) {
            percent = (raw / total) * 100;
        } else {
            warnings.push(`No questions found for code ${code}.`);
        }

        // Round to 1 decimal place
        percent = Math.round(percent * 10) / 10;

        const entry = { code, rawScore: raw, percent };
        breakdown[code] = { rawScore: raw, percent };
        ranked.push(entry);
    });

    // Sort ranked array
    // 1. Raw Score (descending)
    // 2. Percent (descending) - though with equal items per code, this tracks raw score
    // 3. Alphabetical (A, C, E, I, R, S)
    ranked.sort((a, b) => {
        if (b.rawScore !== a.rawScore) {
            return b.rawScore - a.rawScore;
        }
        if (b.percent !== a.percent) {
            return b.percent - a.percent;
        }
        return a.code.localeCompare(b.code);
    });

    // Construct Holland Code (top 3)
    const hollandCode = ranked.slice(0, 3).map((item) => item.code).join("");

    return {
        breakdown,
        hollandCode,
        ranked,
        totalYes,
        warnings,
    };
}
