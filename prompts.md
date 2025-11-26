# Prompts

Use this file to capture all your prompts.

## 2025-11-26

Implement a scoring module that converts a student's Yes/No answers for the 60-item RIASEC test into a Holland 3-letter code plus detailed score breakdown.
The module should validate that at least one response per R/I/A/S/E/C exists; for this dataset there should be exactly 10 questions per code.

Scoring rules:
	Dichotomous scoring: Yes = 1, No = 0.
	For each RIASEC code, compute:
	rawScore = sum of Yes answers for that code (0–10).
	percent = rawScore / 10 * 100 (round to 1 decimal).
	Compute totalYes = sum of all 60 yes answers (sanity check).

Holland code (3-letter):
	Sort the six code scores in descending order by rawScore.
	Tie-break rule (deterministic):
		If scores are equal, compare percent (same here if equal items per code). If still equal:
		Use alphabetical order of the RIASEC code (A, C, E, I, R, S) as final deterministic tie-breaker.
	Holland code = concatenation of the top three codes after tie-break (e.g., "SIC").

Output:
	JSON object with:
		breakdown: object with keys R, I, A, S, E, C each containing { rawScore, percent }.
		hollandCode: string of top three codes (3 letters).
		ranked: array of objects sorted descending by score: { code, rawScore, percent }.
		totalYes: integer.
		warnings: array of strings (e.g., missing answers, invalid values).

Display the json in the browser terminal.
Example output (short):
	{
	  "breakdown": { "R": {"rawScore":6,"percent":60.0}, ... },
	  "hollandCode": "RIC",
	  "ranked": [ {"code":"R","rawScore":6,"percent":60.0}, ... ],
	  "totalYes": 32,
	  "warnings": []
	}

Edge cases & validation:
	If a response for a required id is missing, treat as No but include a warning.
	If responses contains unknown question ids, ignore them but include a warning.
	If questions mapping does not have exactly 10 items per code, still compute using available items but include a warning and compute percent using numItemsForThatCode (not assume 10).
	If all responses are missing or invalid, return an error object with an explanatory message.

## 2025-11-26

For testing, temporarily change the code to display 10 questions. Once test is completed, I want to change it back to 60.
Implement it in sucha way that I will be able to switch between 10 and 60 easily in future.
I will test this manually.
Update READMe.md
Update prompts.md

## 2025-11-26

Please implement the following feature:
When the user completes the answers and presses, Submit, I want to post the following data to the google sheet (ID = 11lvNrudMvB6PjcfoNa9cdn47wqlUpBK4wRE8TUjjPuE) through an App Script.
1. Name
2. Grade
3. Phone Number
4. All [Question ID, Answer] pairs.

Keep the google sheet id in a separate file in the root (credentials.md).

## 2025-11-26

Please remove the "info" button next to Grade in Onboarding screen.
In "Select Grade" drop down options, remove 8.

## 2025-11-26

The sample name and phone number in "Student Name" and "Mobile Number" - Make them lighter.
