/**
 * Google Apps Script - Creekside Dental Landing Page Form Handler
 *
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into Code.gs (replace default contents)
 * 3. Click Deploy > New deployment
 * 4. Select type: Web app
 * 5. Set "Execute as" to your account
 * 6. Set "Who has access" to "Anyone"
 * 7. Click Deploy and copy the Web app URL
 * 8. Paste that URL into Home.tsx where it says GOOGLE_SCRIPT_URL
 *
 * The script will auto-create two sheet tabs on first submission:
 *   - "Applications" (strategy call applications)
 *   - "Lead Magnet Downloads" (email captures for benchmark PDF)
 */

var SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet()
  ? SpreadsheetApp.getActiveSpreadsheet().getId()
  : null;

/**
 * Opens the spreadsheet. If SPREADSHEET_ID is null (standalone script),
 * creates a new spreadsheet. For bound scripts, uses the parent sheet.
 */
function getSpreadsheet() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }
  // For standalone scripts, create or find the sheet
  var files = DriveApp.getFilesByName("Creekside Dental Landing Page Leads");
  if (files.hasNext()) {
    return SpreadsheetApp.openById(files.next().getId());
  }
  var ss = SpreadsheetApp.create("Creekside Dental Landing Page Leads");
  SPREADSHEET_ID = ss.getId();
  Logger.log("Created new spreadsheet: " + ss.getUrl());
  return ss;
}

/**
 * Gets or creates a sheet tab with the given name and headers.
 */
function getOrCreateSheet(ss, sheetName, headers) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Write headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    // Format header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#1a2332");
    headerRange.setFontColor("#ffffff");
    headerRange.setHorizontalAlignment("center");
    // Freeze header row
    sheet.setFrozenRows(1);
    // Auto-resize columns
    for (var i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 160);
    }
  }
  return sheet;
}

/**
 * Handles POST requests from the landing page forms.
 */
function doPost(e) {
  try {
    var data;

    // Parse the incoming data
    if (e.postData && e.postData.type === "application/json") {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      return buildResponse("error", "No data received");
    }

    var ss = getSpreadsheet();
    var formType = data.formType || "unknown";
    var timestamp = new Date().toISOString();

    if (formType === "application") {
      return handleApplication(ss, data, timestamp);
    } else if (formType === "leadMagnet") {
      return handleLeadMagnet(ss, data, timestamp);
    } else {
      return buildResponse("error", "Unknown form type: " + formType);
    }

  } catch (err) {
    Logger.log("Error in doPost: " + err.toString());
    return buildResponse("error", err.toString());
  }
}

/**
 * Handles application form submissions.
 */
function handleApplication(ss, data, timestamp) {
  var headers = [
    "Timestamp",
    "Practice Name",
    "Owner Name",
    "Email",
    "Phone",
    "Revenue Range",
    "Current Ad Spend",
    "Primary Services",
    "Biggest Challenge",
    "Source URL",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content"
  ];

  var sheet = getOrCreateSheet(ss, "Applications", headers);

  var row = [
    timestamp,
    data.practiceName || "",
    data.ownerName || "",
    data.email || "",
    data.phone || "",
    data.revenueRange || "",
    data.currentAdSpend || "",
    data.primaryServices || "",
    data.biggestChallenge || "",
    data.sourceUrl || "",
    data.utmSource || "",
    data.utmMedium || "",
    data.utmCampaign || "",
    data.utmContent || ""
  ];

  sheet.appendRow(row);

  // Send notification email (optional -- uncomment and set your email)
  // MailApp.sendEmail({
  //   to: "peterson@creeksidemarketingpros.com",
  //   subject: "New Strategy Call Application: " + (data.practiceName || "Unknown"),
  //   body: "New application from " + (data.ownerName || "Unknown") + "\n\n" +
  //         "Practice: " + (data.practiceName || "") + "\n" +
  //         "Email: " + (data.email || "") + "\n" +
  //         "Phone: " + (data.phone || "") + "\n" +
  //         "Revenue: " + (data.revenueRange || "") + "\n" +
  //         "Ad Spend: " + (data.currentAdSpend || "") + "\n" +
  //         "Services: " + (data.primaryServices || "") + "\n" +
  //         "Challenge: " + (data.biggestChallenge || "") + "\n\n" +
  //         "UTM: " + (data.utmSource || "direct") + " / " + (data.utmMedium || "") + " / " + (data.utmCampaign || "")
  // });

  return buildResponse("success", "Application received");
}

/**
 * Handles lead magnet email submissions.
 */
function handleLeadMagnet(ss, data, timestamp) {
  var headers = [
    "Timestamp",
    "Email",
    "Source URL",
    "UTM Source",
    "UTM Medium",
    "UTM Campaign",
    "UTM Content"
  ];

  var sheet = getOrCreateSheet(ss, "Lead Magnet Downloads", headers);

  var row = [
    timestamp,
    data.email || "",
    data.sourceUrl || "",
    data.utmSource || "",
    data.utmMedium || "",
    data.utmCampaign || "",
    data.utmContent || ""
  ];

  sheet.appendRow(row);

  return buildResponse("success", "Lead magnet email captured");
}

/**
 * Builds a JSON response for the web app.
 * Note: When called with no-cors mode from the browser, the response body
 * won't be readable. The fetch will resolve (not reject) on success,
 * which is all we need for the UI to show the success state.
 */
function buildResponse(status, message) {
  var output = ContentService.createTextOutput(
    JSON.stringify({ status: status, message: message })
  );
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

/**
 * GET handler -- returns a simple status page for testing.
 */
function doGet(e) {
  return buildResponse("ok", "Creekside form handler is running. Use POST to submit forms.");
}
