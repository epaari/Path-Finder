// Google Apps Script Code
// 1. Create a new Google Sheet.
// 2. Extensions > Apps Script.
// 3. Paste this code.
// 4. Deploy > New Deployment > Select type: Web App.
// 5. Execute as: Me.
// 6. Who has access: Anyone.
// 7. Deploy and copy the Web App URL.

function doPost(e) {
    try {
        // Parse the JSON data sent from the React app
        var data = JSON.parse(e.postData.contents);

        var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

        // Format answers as a string or JSON string
        // data.answers is an array of objects or similar. Let's stringify it for the cell.
        var answersStr = JSON.stringify(data.answers);

        // Append row: [Date, Name, Grade, Mobile, Answers]
        sheet.appendRow([
            new Date(),
            data.name,
            data.grade,
            data.mobile,
            answersStr
        ]);

        return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}
