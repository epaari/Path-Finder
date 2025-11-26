/**
 * Submits quiz data to Google Sheets via App Script.
 * @param {Object} data - The data to submit { name, grade, mobile, answers }.
 * @returns {Promise<boolean>} - True if successful, false otherwise.
 */
export async function submitToGoogleSheets(data) {
    // TODO: Replace with your actual Web App URL after deployment
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxKcpjRhp69XSrgzcW-elIdgYck_a07iZNKxYP-0tPs6K5RWVn-Hwb1RV4xP-aJfVrd/exec";

    try {
        // We use no-cors mode because Google Apps Script redirects, and CORS might block the response reading.
        // However, for a simple fire-and-forget or basic submission, this is often enough.
        // To get a real response, the script needs to handle CORS properly (doGet/doPost with headers).
        // For this implementation, we'll try standard POST.

        // Note: Google Apps Script Web Apps often require 'application/x-www-form-urlencoded' or specific handling for JSON.
        // We will send as JSON stringified in the body, but the script must parse it.

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors", // Important for simple Google Apps Script requests from browser
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        console.log("Submitted to Google Sheets");
        return true;
    } catch (error) {
        console.error("Error submitting to Google Sheets:", error);
        return false;
    }
}
