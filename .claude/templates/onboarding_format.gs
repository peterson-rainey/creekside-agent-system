/**
 * Creekside Marketing - Onboarding Sheet formatter
 *
 * HOW TO USE
 * 1. Open the onboarding sheet in Google Sheets.
 * 2. Extensions > Apps Script.
 * 3. Replace any placeholder code with this entire file. Save (Cmd+S).
 * 4. To build General Info Part 1 + Part 2: select `buildBoth`, click Run.
 * 5. To build individual tabs: pick `buildGeneralInfoPart1`, `buildGeneralInfoPart2`, or `buildConversionTrackingTab`.
 * 6. NOTE: Conversion Tracking is FROZEN per Peterson 2026-05-06 - run buildConversionTrackingTab manually if needed; buildBoth deliberately excludes it.
 * 7. First run will ask for authorization - approve.
 * 8. Refresh the spreadsheet to see the new tab(s).
 * 9. UTILITY: deleteForCreeksideUseTab is a ONE-TIME migration helper - only run if the legacy "For Creekside Use" tab still exists. Do NOT run on production sheets without confirming.
 *
 * All functions DELETE any existing tab with the same name and rebuild from scratch - safe to re-run.
 */

// Visual style - matched to existing General Info Form tab

function buildGeneralInfoPart1() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    // Cleanup: delete old "Draft v2" tab if present (renamed to Part 1)
    const oldTab = ss.getSheetByName('General Info Form (Draft v2)');
    if (oldTab && ss.getSheets().length > 1) ss.deleteSheet(oldTab);
    buildTab_(ss, 'General Info Part 1', GENERAL_INFO_PART1);
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildGeneralInfoPart1 failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

function buildGeneralInfoPart2() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    buildStrategyTablesTab_(ss, 'General Info Part 2', GENERAL_INFO_PART2);
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildGeneralInfoPart2 failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

/**
 * Builds General Info Part 1 + Part 2 only.
 * Conversion Tracking is FROZEN per Peterson 2026-05-06 - run buildConversionTrackingTab manually if needed.
 */
function buildBoth() {
  try {
    buildGeneralInfoPart1();
    buildGeneralInfoPart2();
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildBoth failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

function buildConversionTrackingTab() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    buildTab_(ss, 'Conversion Tracking', CONVERSION_TRACKING);
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildConversionTrackingTab failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

function buildGoogleInfoForm() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    buildTab_(ss, 'Google Info Form', GOOGLE_INFO_FORM);
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildGoogleInfoForm failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

function buildMetaInfoForm() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    buildTab_(ss, 'Meta Info Form', META_INFO_FORM);
  } catch (e) {
    SpreadsheetApp.getUi().alert('buildMetaInfoForm failed: ' + e.message + '\n\n' + (e.stack || ''));
    throw e;
  }
}

/**
 * Deletes the deprecated "For Creekside Use" tab.
 * The Conversion Tracking (Draft) tab replaces its purpose - account managers
 * fill out conversion-tracking specifics there before passing to Jordan.
 */
function deleteForCreeksideUseTab() {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('For Creekside Use');
    if (!sheet) {
      SpreadsheetApp.getUi().alert('Tab "For Creekside Use" not found - already deleted or renamed.');
      return;
    }
    if (ss.getSheets().length <= 1) {
      SpreadsheetApp.getUi().alert('Cannot delete - this is the only tab in the spreadsheet.');
      return;
    }
    ss.deleteSheet(sheet);
    SpreadsheetApp.getUi().alert('Deleted "For Creekside Use" tab. Conversion Tracking (Draft) replaces its purpose.');
  } catch (e) {
    SpreadsheetApp.getUi().alert('deleteForCreeksideUseTab failed: ' + e.message);
    throw e;
  }
}

const STYLE = {
  bannerBg: '#3F708F',
  bannerAccent: '#2A5470',
  bannerFg: '#FFFFFF',
  bannerSubFg: '#E8E8E8',
  sectionBg: '#DAE8F0',
  sectionAccent: '#3F708F',
  sectionFg: '#1F1F1F',
  questionAltA: '#FFFFFF',
  questionAltB: '#F7F9FB',
  rowBorder: '#EAEDF0',
  notesFg: '#555555',
  bannerTopRowHeight: 14,
  bannerRowHeight: 64,
  columnHeaderHeight: 30,
  sectionRowHeight: 34,
  questionRowHeight: 56,
  sectionSpacer: 14,
  fontFamily: 'Arial',
};

// 4 columns: A spacer | B Question | C Your Answer | D Notes/Help
const COL_WIDTHS = [30, 460, 380, 380];


function buildTab_(ss, sheetName, content) {
  // Replace if exists
  const existing = ss.getSheetByName(sheetName);
  if (existing) ss.deleteSheet(existing);
  const sheet = ss.insertSheet(sheetName);

  // Column widths (4 cols: A spacer | B Question | C Your Answer | D Notes/Help)
  COL_WIDTHS.forEach((w, i) => sheet.setColumnWidth(i + 1, w));
  // Hide unused right columns
  if (sheet.getMaxColumns() > 4) sheet.hideColumns(5, sheet.getMaxColumns() - 4);

  let row = 1;

  // Row 1 spacer
  sheet.setRowHeight(row, STYLE.bannerTopRowHeight);
  row++;

  // Banner row 2 (merge B:D)
  const bannerRange = sheet.getRange(row, 2, 1, 3).merge();
  bannerRange.setValue(content.bannerTitle + '\n' + content.bannerSubtitle);
  bannerRange.setBackground(STYLE.bannerBg);
  bannerRange.setFontColor(STYLE.bannerFg);
  bannerRange.setFontWeight('bold');
  bannerRange.setFontSize(16);
  bannerRange.setHorizontalAlignment('center');
  bannerRange.setVerticalAlignment('middle');
  bannerRange.setFontFamily(STYLE.fontFamily);
  bannerRange.setWrap(true);
  // Make subtitle smaller via rich text
  const richText = SpreadsheetApp.newRichTextValue()
    .setText(content.bannerTitle + '\n' + content.bannerSubtitle)
    .setTextStyle(0, content.bannerTitle.length,
      SpreadsheetApp.newTextStyle().setBold(true).setFontSize(16).setForegroundColor(STYLE.bannerFg).build())
    .setTextStyle(content.bannerTitle.length + 1, content.bannerTitle.length + 1 + content.bannerSubtitle.length,
      SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(10).setForegroundColor(STYLE.bannerSubFg).build())
    .build();
  bannerRange.setRichTextValue(richText);
  sheet.setRowHeight(row, STYLE.bannerRowHeight);
  row++;

  // Optional intro/legend row (small subtitle)
  if (content.introLine) {
    const legendRange = sheet.getRange(row, 2, 1, 3).merge();
    legendRange.setValue(content.introLine);
    legendRange.setBackground('#F0F4F7');
    legendRange.setFontColor('#444444');
    legendRange.setFontStyle('italic');
    legendRange.setFontSize(9);
    legendRange.setHorizontalAlignment('center');
    legendRange.setVerticalAlignment('middle');
    legendRange.setFontFamily(STYLE.fontFamily);
    sheet.setRowHeight(row, 22);
    row++;
  }

  // Column headers row (3 columns now)
  const headerRange = sheet.getRange(row, 2, 1, 3);
  headerRange.setValues([['Question', 'Your answer', 'Notes / Help']]);
  headerRange.setBackground('#1F1F1F');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment('left');
  headerRange.setVerticalAlignment('middle');
  headerRange.setFontFamily(STYLE.fontFamily);
  headerRange.setBorder(true, true, true, true, false, false, '#1F1F1F', SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(row, STYLE.columnHeaderHeight);
  row++;

  // Sections
  let alternateToggle = false;
  for (const section of content.sections) {
    // Section header (merge B:D)
    const secRange = sheet.getRange(row, 2, 1, 3).merge();
    const secText = section.title + (section.subtitle ? '   |   ' + section.subtitle : '');
    secRange.setValue(secText);
    secRange.setBackground(STYLE.sectionBg);
    secRange.setFontColor(STYLE.sectionFg);
    secRange.setFontWeight('bold');
    secRange.setFontSize(12);
    secRange.setHorizontalAlignment('left');
    secRange.setVerticalAlignment('middle');
    secRange.setFontFamily(STYLE.fontFamily);
    secRange.setWrap(true);
    // Style subtitle as italic if present
    if (section.subtitle) {
      const titleLen = section.title.length;
      const sepLen = '   |   '.length;
      const subLen = section.subtitle.length;
      const richSec = SpreadsheetApp.newRichTextValue()
        .setText(secText)
        .setTextStyle(0, titleLen,
          SpreadsheetApp.newTextStyle().setBold(true).setFontSize(12).setForegroundColor(STYLE.sectionFg).build())
        .setTextStyle(titleLen, titleLen + sepLen + subLen,
          SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(10).setForegroundColor('#555555').build())
        .build();
      secRange.setRichTextValue(richSec);
    }
    // Subtle accent stripe under section header
    secRange.setBorder(null, null, true, null, false, false, STYLE.sectionAccent, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setRowHeight(row, STYLE.sectionRowHeight);
    row++;

    // Questions
    for (const q of section.questions) {
      // Sub-header row (visually separates groups within a section, e.g., "PERSONA 1")
      if (q.subheader) {
        const subRange = sheet.getRange(row, 2, 1, 3).merge();
        subRange.setValue(q.q);
        subRange.setBackground('#EAF2F8');
        subRange.setFontColor('#1F1F1F');
        subRange.setFontWeight('bold');
        subRange.setFontSize(10);
        subRange.setHorizontalAlignment('left');
        subRange.setVerticalAlignment('middle');
        subRange.setFontFamily(STYLE.fontFamily);
        sheet.setRowHeight(row, 26);
        row++;
        continue;
      }

      // Resource link row (banner-style merged row with prominent clickable link)
      // Schema: { resourceLink: true, label: 'CLICK THIS', url: 'https://...', description: 'optional one-liner' }
      if (q.resourceLink) {
        const merged = sheet.getRange(row, 2, 1, 3).merge();
        const fullText = q.label + (q.description ? '\n' + q.description : '');
        const builder = SpreadsheetApp.newRichTextValue()
          .setText(fullText)
          .setTextStyle(0, q.label.length,
            SpreadsheetApp.newTextStyle().setBold(true).setFontSize(13).setForegroundColor('#1A73E8').setUnderline(true).build());
        if (q.url) builder.setLinkUrl(0, q.label.length, q.url);
        if (q.description) {
          builder.setTextStyle(q.label.length + 1, q.label.length + 1 + q.description.length,
            SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(10).setForegroundColor(STYLE.notesFg).build());
        }
        merged.setRichTextValue(builder.build());
        merged.setBackground('#F0F8FF');
        merged.setHorizontalAlignment('left');
        merged.setVerticalAlignment('middle');
        merged.setFontFamily(STYLE.fontFamily);
        merged.setWrap(true);
        merged.setBorder(null, true, null, null, false, false, '#1A73E8', SpreadsheetApp.BorderStyle.SOLID_THICK);
        sheet.setRowHeight(row, q.description ? 56 : 38);
        row++;
        continue;
      }

      // Dual-checkbox group header (column labels above a group of dual-checkbox rows)
      if (q.dualCheckboxHeader) {
        const labelB = sheet.getRange(row, 2);
        const labelC = sheet.getRange(row, 3);
        const labelD = sheet.getRange(row, 4);
        labelB.setValue(q.questionLabel || 'Item');
        labelC.setValue(q.primaryLabel || 'I have done this');
        labelD.setValue(q.secondaryLabel || "I don't have an account - please set one up for me");
        const headerCells = sheet.getRange(row, 2, 1, 3);
        headerCells.setBackground('#2A5470');
        headerCells.setFontColor('#FFFFFF');
        headerCells.setFontWeight('bold');
        headerCells.setFontSize(9);
        headerCells.setFontFamily(STYLE.fontFamily);
        headerCells.setVerticalAlignment('middle');
        headerCells.setWrap(true);
        labelB.setHorizontalAlignment('left');
        labelC.setHorizontalAlignment('center');
        labelD.setHorizontalAlignment('center');
        sheet.setRowHeight(row, 30);
        row++;
        continue;
      }

      // Dual-checkbox row: question (with optional help URL) | checkbox | checkbox
      if (q.dualCheckbox) {
        const fillBg = alternateToggle ? STYLE.questionAltB : STYLE.questionAltA;
        alternateToggle = !alternateToggle;
        const qCell = sheet.getRange(row, 2);
        const cbA = sheet.getRange(row, 3);
        const cbB = sheet.getRange(row, 4);

        // Question cell with optional rich-text help URL on a second line
        const helpText = q.helpUrlText || (q.helpUrl ? 'How-to guide' : '');
        const baseText = q.q + (q.note ? '\n' + q.note : '') + (q.helpUrl ? '\n' + helpText : '');
        const builder = SpreadsheetApp.newRichTextValue()
          .setText(baseText)
          .setTextStyle(0, q.q.length,
            SpreadsheetApp.newTextStyle().setBold(true).setFontSize(11).setForegroundColor('#1F1F1F').build());
        let cursor = q.q.length;
        if (q.note) {
          const noteStart = cursor + 1;
          const noteEnd = noteStart + q.note.length;
          builder.setTextStyle(noteStart, noteEnd,
            SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(9).setForegroundColor(STYLE.notesFg).build());
          cursor = noteEnd;
        }
        if (q.helpUrl) {
          const linkStart = cursor + 1;
          const linkEnd = linkStart + helpText.length;
          builder.setTextStyle(linkStart, linkEnd,
            SpreadsheetApp.newTextStyle().setBold(false).setItalic(false).setFontSize(9).setForegroundColor('#1A73E8').setUnderline(true).build());
          builder.setLinkUrl(linkStart, linkEnd, q.helpUrl);
        }
        qCell.setRichTextValue(builder.build());
        qCell.setBackground(fillBg);
        qCell.setVerticalAlignment('middle');
        qCell.setFontFamily(STYLE.fontFamily);
        qCell.setWrap(true);

        cbA.insertCheckboxes();
        cbA.setBackground(fillBg);
        cbA.setHorizontalAlignment('center');
        cbA.setVerticalAlignment('middle');

        cbB.insertCheckboxes();
        cbB.setBackground(fillBg);
        cbB.setHorizontalAlignment('center');
        cbB.setVerticalAlignment('middle');

        // Subtle bottom border between rows
        const allCells = sheet.getRange(row, 2, 1, 3);
        allCells.setBorder(null, null, true, null, false, false, STYLE.rowBorder, SpreadsheetApp.BorderStyle.SOLID);

        sheet.setRowHeight(row, STYLE.questionRowHeight);
        row++;
        continue;
      }

      const fillBg = alternateToggle ? STYLE.questionAltB : STYLE.questionAltA;
      alternateToggle = !alternateToggle;

      const qCell = sheet.getRange(row, 2);
      const ansCell = sheet.getRange(row, 3);
      const notesCell = sheet.getRange(row, 4);

      // Question
      qCell.setValue(q.q);
      qCell.setFontWeight('bold');
      qCell.setFontSize(11);
      qCell.setFontFamily(STYLE.fontFamily);
      qCell.setVerticalAlignment('middle');
      qCell.setBackground(fillBg);
      qCell.setWrap(true);

      // Answer cell - empty, ready for client input
      ansCell.setValue(q.answer || '');
      ansCell.setBackground(fillBg);
      ansCell.setVerticalAlignment('middle');
      ansCell.setFontFamily(STYLE.fontFamily);
      ansCell.setFontSize(10);
      ansCell.setWrap(true);
      // Dropdown validation
      if (q.dropdown && q.dropdown.length > 0) {
        const rule = SpreadsheetApp.newDataValidation()
          .requireValueInList(q.dropdown, true)
          .setAllowInvalid(false)
          .setHelpText('Pick one: ' + q.dropdown.join(' / '))
          .build();
        ansCell.setDataValidation(rule);
        ansCell.setHorizontalAlignment('left');
      }
      // Checkbox cell (boolean confirmation, no free-text answer)
      if (q.checkbox) {
        ansCell.clearDataValidations();
        ansCell.insertCheckboxes();
        ansCell.setHorizontalAlignment('center');
      }

      // Notes/help
      notesCell.setValue(q.note || '');
      notesCell.setBackground(fillBg);
      notesCell.setFontColor(STYLE.notesFg);
      notesCell.setFontStyle('italic');
      notesCell.setFontSize(9);
      notesCell.setFontFamily(STYLE.fontFamily);
      notesCell.setVerticalAlignment('middle');
      notesCell.setWrap(true);

      // Subtle bottom border between rows
      const rowCells = sheet.getRange(row, 2, 1, 3);
      rowCells.setBorder(null, null, true, null, false, false, STYLE.rowBorder, SpreadsheetApp.BorderStyle.SOLID);

      sheet.setRowHeight(row, STYLE.questionRowHeight);
      row++;
    }

    // Spacer row between sections
    sheet.setRowHeight(row, STYLE.sectionSpacer);
    row++;
  }

  // Footer notes
  if (content.footerNotes && content.footerNotes.length) {
    const footerHeader = sheet.getRange(row, 2, 1, 3).merge();
    footerHeader.setValue('NOTES');
    footerHeader.setBackground('#1F1F1F');
    footerHeader.setFontColor('#FFFFFF');
    footerHeader.setFontWeight('bold');
    footerHeader.setFontSize(10);
    footerHeader.setHorizontalAlignment('left');
    footerHeader.setVerticalAlignment('middle');
    footerHeader.setFontFamily(STYLE.fontFamily);
    sheet.setRowHeight(row, 24);
    row++;
    for (const note of content.footerNotes) {
      const noteRange = sheet.getRange(row, 2, 1, 3).merge();
      noteRange.setValue('>>  ' + note);
      noteRange.setBackground('#FAFAFA');
      noteRange.setFontColor('#333333');
      noteRange.setFontSize(9);
      noteRange.setFontFamily(STYLE.fontFamily);
      noteRange.setVerticalAlignment('middle');
      noteRange.setWrap(true);
      noteRange.setFontStyle('italic');
      noteRange.setBorder(null, true, null, null, false, false, STYLE.bannerBg, SpreadsheetApp.BorderStyle.SOLID_THICK);
      sheet.setRowHeight(row, 30);
      row++;
    }
  }

  // Freeze top rows (banner + intro line if present + column headers = 3 or 4)
  sheet.setFrozenRows(content.introLine ? 4 : 3);

  // Hide gridlines
  sheet.setHiddenGridlines(true);

  return sheet;
}


// =====================================================================
// CONVERSION TRACKING CONTENT
// =====================================================================
const CONVERSION_TRACKING = {
  bannerTitle: 'CREEKSIDE MARKETING  |  CONVERSION TRACKING ONBOARDING',
  bannerSubtitle: 'This tab gets technical. If you do not know an answer, leave it blank or write "TBD." We will discover most of it after access is granted, or cover it with you on the kickoff call.',
  introLine: 'Most of these questions are for your IT or technical contact. If a question makes no sense to you, skip it - we will pick it up after access.',
  sections: [
    {
      title: '1. PROJECT & STAKEHOLDERS',
      subtitle: 'Who is involved and how decisions get made.',
      questions: [
        {q: 'Marketing decision maker (name, email, role)', note: 'Person who signs off on tracking strategy and major changes. May differ from primary day-to-day contact. Example: "Dr. Smith, owner, drsmith@yourdomain.com - approves anything affecting patient data."'},
        {q: 'Technical / IT contact (name, email)', note: 'Person who can approve changes to your website, CRM, or DNS. Example: "Mike Lee, IT Manager, mike@yourdomain.com." If you do not have an IT contact, list whoever maintains your website.'},
        {q: 'Existing agency / partner contacts (if any other agencies are involved)', note: 'Other agencies, freelancers, or partners with access to your ad accounts or website. We coordinate with them so we do not undo each other work. Example: "Jane Doe at SEO Co - jane@seoco.com - manages organic SEO."'},
        {q: 'Existing tracking vendor (if replacing or coexisting)', note: '"Tracking vendor" = whoever currently sets up your conversion tracking, pixels, or analytics. If we are replacing them, name them so we know what to dismantle. Skip if no one currently does this for you.'},
        {q: 'Target launch date for tracking live', note: 'When you want tracking deployed and verified. Example: "First week of March." We will refine the timeline together based on how fast access is granted.'},
        {q: 'Scope expectation - setup only / ongoing management / not sure', note: 'Setup only = we install tracking and hand it back to you. Ongoing management = we maintain and tune it as part of your monthly retainer. If unsure, pick "Not sure" and we will discuss on kickoff.'},
      ]
    },
    {
      title: '2. WEBSITE & CMS',
      subtitle: 'We can not deploy tracking until the site is live and we have access to it.',
      questions: [
        {q: 'Production URL', note: 'The main public URL of your website. Example: "https://www.yourdomain.com." Just the homepage URL is fine.'},
        {q: 'Staging / dev URL (if exists)', note: '"Staging" or "dev" = a separate copy of your website used for testing before changes go live. Example: "https://staging.yourdomain.com." Most clients do not have one. Leave blank if you do not.'},
        {q: 'Site status - live / in development / pre-launch', note: 'Live = published and getting traffic. In development = still being built. Pre-launch = nearly ready but not public yet. If pre-launch, give us your expected go-live date.'},
        {q: 'CMS or platform', note: '"CMS" = the system used to build and edit your website. Common ones: WordPress, Shopify, Webflow, Wix, Squarespace, custom-coded. To find this: ask your web developer, or paste your URL into builtwith.com which will detect it automatically.'},
        {q: 'CMS admin access - who provides login, what role', note: 'We need someone with full admin permissions - someone who can install plugins/apps AND edit code in the page head. On Shopify, those are different permissions, so make sure they have both. "Login access" alone is usually not enough.'},
        {q: 'Who controls deploys', note: '"Deploys" = pushing changes from a development environment to the live site. Example answers: "I update the live site directly," "Our dev team handles all changes through GitHub," "Our outside agency does it on Tuesdays." Tells us how fast we can ship tracking changes.'},
        {q: 'GTM container injected on site (yes / no / partial / unknown)', note: '"GTM" = Google Tag Manager. The container is a small code snippet that lets us add tracking without changing your site code each time. To check: view your site source (right-click > "View Page Source"), search for "GTM-" - if you see it, GTM is installed. If unknown, leave blank, we will inspect.'},
        {q: 'Subdomains in scope (list all)', note: 'A "subdomain" is a section of your site with its own URL prefix. Example: blog.yourdomain.com, store.yourdomain.com, app.yourdomain.com. List every subdomain where you want us to track activity. If your site is just www.yourdomain.com with no extras, just list that.'},
        {q: 'Cross-domain conversion paths (third-party tools or domains in the conversion path)', note: 'Any place where a customer leaves your site to complete a conversion. Common examples: a Calendly booking page, an Acuity scheduler, a third-party checkout (like a separate Stripe-hosted page), embedded ChiroForm, Jane App for healthcare. If users hit one of these to convert, list it. Tracking has to be configured to follow them across domains.'},
        {q: 'Who controls DNS for the production domain (registrar login or hosting panel)', note: '"DNS" = the system that points your domain name to your website. Whoever has the login to your domain registrar (GoDaddy, Namecheap, Cloudflare, AWS Route 53, etc.) controls DNS. We need this contact only if we set up server-side tracking. Example: "I bought the domain on GoDaddy - I have the login."'},
      ]
    },
    {
      title: '3. INDUSTRY & AD PLATFORMS',
      subtitle: 'Your industry drives platform restrictions; programmatic is listed separately because each vendor delivers tags differently.',
      questions: [
        {q: 'Industry / vertical', note: 'What industry your business is in. Example: "Healthcare - dental practice," "Financial services - mortgage brokerage," "E-commerce - apparel." Healthcare and financial services have specific ad-platform restrictions on conversion data - we will walk through those on kickoff.'},
        {q: 'Google Ads - Account ID, MCC if applicable, monthly spend', note: '10-digit Account ID format: 123-456-7890. To find it: log in to Google Ads at ads.google.com - the ID is in the top-right corner of the screen. "MCC" = Manager Account, used by agencies. Skip MCC if you do not have one. Also list approximate monthly ad spend.'},
        {q: 'Meta (Facebook / Instagram) - Business Manager ID, Ad Account ID, Pixel ID', note: 'Business Manager ID: 15-16 digit number. Find it at business.facebook.com > Business Settings (top right) > Business Info. Ad Account ID: starts with "act_" then a number. Find it in Ads Manager URL or Business Settings > Accounts > Ad Accounts. Pixel ID: 15-16 digit number found at Events Manager > Data Sources.'},
        {q: 'Microsoft / Bing Ads - Account ID', note: 'Skip if you are not running Microsoft (Bing) Ads. Account ID is in the top-right corner once logged in to ads.microsoft.com.'},
        {q: 'TikTok Ads - Account ID, Pixel ID', note: 'Skip if not running TikTok Ads. Both IDs are in TikTok Ads Manager under Assets > Events.'},
        {q: 'Programmatic / DSP vendor name(s), tag delivery method, contact at vendor', note: '"Programmatic / DSP" = ad platforms beyond the major networks (StackAdapt, The Trade Desk, Google DV360, etc.). If you are running programmatic, list the vendor name AND a contact at that vendor. We need the actual tracking tag (JavaScript, image pixel, or server-to-server postback spec) - not just a vendor name. Skip this if you are not running programmatic.'},
      ]
    },
    {
      title: '4. CONVERSION STRATEGY',
      subtitle: 'What counts as a conversion, and how we measure it.',
      questions: [
        {q: 'Primary conversion event', note: 'The single most important action a user takes - the one we optimize ad spend toward. Example: "Form submission for a free consultation," "Phone call to the office," "Purchase," "Booking an appointment."'},
        {q: 'Secondary conversions worth tracking', note: 'Smaller actions worth measuring even if they are not the main goal. Example: "Newsletter signup," "Watched 50% of homepage video," "Visited pricing page," "Downloaded brochure." Helps us spot warm leads.'},
        {q: 'Phone tracking - which platform (or none)', note: 'If you track which ads drive phone calls, what software does it. Common: CallRail (most popular), CTM (CallTrackingMetrics), native Google forwarding numbers. If you do not currently track phone calls, write "none" - we can recommend a platform.'},
        {q: 'Phone tracking format', note: '"Dynamic Number Insertion" (DNI) shows different phone numbers to different visitors so we know which ad source drove the call. "Static" uses one number per ad campaign. DNI is more accurate but requires more setup.', dropdown: ['Dynamic Number Insertion (DNI)','Static numbers per campaign','Not yet decided','Not applicable - no phone tracking']},
        {q: 'Offline conversions matter - which events', note: '"Offline conversion" = something that happens AFTER the lead leaves your website (closed deal, showed up to appointment, became a customer). If you want to optimize ads toward closed deals (not just form fills), name the events. Example: "Closed-won opportunity," "Appointment kept," "Deposit paid." Skip if you only care about online actions.'},
        {q: 'Average revenue per lead or per conversion type (rough estimate is fine)', note: 'Rough $ amount each conversion is worth. Drives whether we attach the same value to every lead, or pull real revenue from your CRM. Example: "$80 average per consult booking, $4,500 average per implant patient who books." If you have multiple conversion types, list each.'},
        {q: 'View-through window (days post-impression) - if you have a preference', note: 'Most clients leave this blank - we set platform defaults. Defaults: Google Ads = 1-day view; Meta = 1-day view. Only fill in if you have a specific business reason for a non-default window. ("View-through" = a conversion where someone saw your ad but did not click it - they came back later directly).'},
        {q: 'Click-through window - if you have a preference', note: 'Most clients leave this blank - we set platform defaults. Defaults: Google Ads = 30-day click; Meta = 7-day click. Only fill in if you have a specific requirement. ("Click-through window" = how long after clicking an ad a conversion still gets credit).'},
        {q: 'Attribution model preference', note: 'How conversion credit gets distributed across multiple ad touchpoints (e.g., when someone sees a Facebook ad, then later clicks a Google ad, then converts). Leave blank to use platform default - that is the right answer for most.', dropdown: ['Data-driven','Last click','First click','Position-based','Linear','No preference - use default']},
        {q: 'Conversion value approach', note: 'Whether and how we attach a $ amount to each conversion. Static = every conversion is worth the same fixed amount. Dynamic from CRM = we pull real revenue per lead from your CRM. Most clients pick "Not sure" and we recommend on kickoff.', dropdown: ['Static per event (every conversion = same $)','Dynamic from CRM (real revenue per lead)','No value tracking','Not sure - recommend on kickoff']},
      ]
    },
    {
      title: '5. FORMS & LEAD CAPTURE',
      subtitle: 'Every form on your site is a place we can wire conversion tracking. Each one needs to be configured.',
      questions: [
        {q: 'Form platform(s)', note: 'What software builds your forms. Examples: native website forms (just HTML), Gravity Forms (a WordPress plugin), HubSpot Forms, Marketo, Salesforce Web-to-Lead, Typeform, Jotform, custom-coded. To find out: ask your web developer, or right-click a form on your site > "View frame source" - usually identifies it. List multiple if you use different platforms on different pages.'},
        {q: 'List every form (page URL, form name, what triggers a submit)', note: 'For each form: which page it is on, what it is called, and what makes it submit (button click, redirect to thank-you page, inline confirmation). Example: "yourdomain.com/contact - Contact Form - submits to /thank-you page." Helps us know exactly which surfaces to track.'},
        {q: 'Fields collected on each form', note: 'What information each form asks for. Example: "Contact form: name, email, phone, message. Booking form: name, email, phone, preferred date." Email and phone are especially important - they enable better ad-platform matching.'},
        {q: 'Forms collect email or phone?', note: 'If forms capture email or phone, ad platforms can match leads to people who saw your ads, which dramatically improves conversion data. If "no," we may recommend adding fields.', dropdown: ['Yes','No','Unsure']},
        {q: 'Form platform supports hidden fields and URL parameter capture', note: '"Hidden fields" = invisible form fields that capture data automatically (like which ad source the visitor came from). Some platforms support this, others do not. To check: ask your form provider, or look in the form-builder admin for an option called "hidden field" or "URL parameter capture." If unsure, leave blank - we will test after access.'},
        {q: 'Where do submissions land (CRM object, email notification, Zapier, etc.)', note: 'When someone submits a form, where does the data go? Example: "Goes into HubSpot as a Contact," "Sends an email to office@yourdomain.com," "Goes through Zapier to Google Sheets." List every destination.'},
        {q: 'Thank-you page or inline confirmation after submit', note: 'After a form submits, what does the visitor see? A redirect to a separate "thank you" URL, or an inline message that appears on the same page? Example: "Redirects to /thank-you," or "Shows a green checkmark on the same page." This affects how we fire the conversion event.'},
        {q: 'reCAPTCHA or other spam filter in use?', note: 'Affects how we run test leads. If yes, name the filter (reCAPTCHA, Akismet, CleanTalk, WAF rule, etc.) so we can configure around it.', dropdown: ['Yes','No','Unsure']},
      ]
    },
    {
      title: '6. CRM FOUNDATION',
      subtitle: 'CRM setup determines how we connect ad clicks back to closed deals. The deeper we can hook into your CRM, the better we optimize.',
      questions: [
        {q: 'Do you use a CRM?', note: '"CRM" = software for managing leads and customer data. If "no" or "informal," skip the rest of Section 6 and Section 7.', dropdown: ['Yes - dedicated CRM','Informal (email or spreadsheet)','No']},
        {q: 'CRM platform(s) - list all', note: 'The CRM software you use. Common: Salesforce, HubSpot, Zoho, Pipedrive, GoHighLevel (GHL), Monday, custom. Also include any clinical or operational systems that hold patient or lead data (Dentrix, Carestack, Jane App, athenaHealth) - these affect HIPAA compliance.'},
        {q: 'Edition / tier', note: 'Which version of your CRM you have. Different tiers have different features. Example: "Salesforce Sales Cloud Enterprise," "HubSpot Marketing Hub Pro," "GHL Agency Pro." To find: log in to your CRM > Account or Billing settings.'},
        {q: 'Marketing automation tier', note: '"Marketing automation" = automatic email/SMS sequences, lead scoring, campaign workflows. Some CRMs (like Salesforce) require a separate product for this (Marketing Cloud, or Marketing Cloud Account Engagement which was formerly named Pardot). Others bundle it in (HubSpot Marketing Hub, GHL). This determines whether we can set up offline conversion sync directly or need a custom integration.'},
        {q: 'CRM admin contact (name, email - confirmed admin not just login)', note: 'The person on your team with FULL admin permissions on your CRM. Not just a regular login. We need someone who can install integrations or approve API connections. Example: "Sarah Lee, sarah@yourdomain.com - confirmed admin."'},
        {q: 'Can the admin approve a Connected App / API integration', note: '"Connected App" / "API integration" = a way for our tracking to securely talk to your CRM. Some companies require IT approval before any third-party integration is installed. If your admin can install integrations directly, answer yes. If IT or security has to sign off first, answer no - this affects timeline.'},
        {q: 'API access available (REST / Bulk / Streaming / webhook)', note: '"API" = a way for software systems to talk to each other. Most CRMs offer an API but the type varies. To find out: ask your CRM admin, or check your CRM docs for "API access." If you do not know, write "Unsure" - we will check after access.'},
        {q: 'Existing API integrations', note: 'Anything already connected to your CRM via API. Example: "Zapier connected to MailChimp," "Calendly automatically creates contacts," "Custom integration with our scheduling system." Helps us avoid breaking existing automations.'},
        {q: 'Sandbox available?', note: '"Sandbox" = a non-production copy of your CRM used for testing without affecting real data. Most enterprise CRMs offer one (Salesforce, HubSpot Enterprise). Most small-business CRMs do not. If unsure, ask your CRM admin.', dropdown: ['Yes','No','Unsure']},
        {q: 'Customer-list export available (email + phone of past customers)', note: 'Whether you can export a list of past customers (email and phone) from your CRM. Used for "Customer Match" (Google) and "Custom Audiences" (Meta) - lets us target lookalike audiences and exclude existing customers from prospecting ads. Boosts performance noticeably.'},
      ]
    },
    {
      title: '7. CONSENT & PRIVACY',
      subtitle: 'Required before we deploy any tags. Mismatched consent setup is the most common cause of low match rates and broken data.',
      questions: [
        {q: 'Geographic markets', note: 'Which countries or regions you advertise to (US, EU, UK, CA, etc.). Determines what consent rules apply. EU/UK markets require Google Consent Mode v2 - that is a non-trivial extra setup we plan ahead for.'},
        {q: 'Subject to HIPAA?', note: '"HIPAA" = US healthcare privacy law. If you handle patient health information, you are subject. This drastically restricts what data can be sent to ad platforms - even hashed data. Drives the entire tracking architecture for healthcare clients. If unsure, ask your legal or compliance contact.', dropdown: ['Yes','No','Unsure - need to check']},
        {q: 'Consent management platform (CMP)', note: '"CMP" = the software that shows users your cookie banner and remembers their privacy preferences. Common: OneTrust, Cookiebot, TrustArc, Termly, Iubenda. Some clients use a built-in option from their CMS (Shopify and WordPress have native banners). Write "none" if you do not have one - we will need to add one for EU traffic.'},
        {q: 'Privacy policy URL', note: 'The public URL where users can read your privacy policy. Example: "https://yourdomain.com/privacy."'},
        {q: 'Cookie policy URL', note: 'Public URL where users can read your cookie policy. Often combined with the privacy policy on smaller sites. If they are the same URL, just paste the same one.'},
        {q: 'Data Processing Agreement (DPA) signed with ad platforms (Google, Meta, etc.)?', note: '"DPA" = a legal agreement between you and an ad platform that lets them process your customer data on your behalf. Required before sending hashed customer data (Enhanced Conversions, CAPI). Your legal or compliance contact will know - feel free to forward this question.', dropdown: ['Yes - all platforms','Yes - some platforms','No','Unsure']},
        {q: 'PII handling restrictions - fields you cannot send to ad platforms even hashed', note: '"PII" = personally identifiable information (name, email, phone, address). Some companies have legal restrictions on what data can leave their systems even when scrambled. Common in healthcare and finance. List any fields your legal team has flagged. Example: "Cannot send patient diagnoses or financial account info even hashed." If unrestricted, write "none."'},
      ]
    },
    {
      title: '8. ACCESS CHECKLIST - CHECK OFF AS YOU GRANT EACH',
      subtitle: 'Grant access to ads@creeksidemarketingpros.com (or our Business Manager Partner ID 877081733504917 for Meta). Skip rows that do not apply (e.g., Microsoft Ads if you are not running Microsoft Ads).',
      questions: [
        {q: 'Granted Google Tag Manager publish access on all containers (web + server if applicable)', note: 'Publish-level on every container, not just read. To grant: tagmanager.google.com > select container > Admin (top right) > User Management > Add User > Publish permission.', checkbox: true},
        {q: 'Granted Google Analytics 4 editor access on the property', note: 'Editor-level lets us configure events and audiences. To grant: analytics.google.com > Admin > Property Access Management > Add User > Editor role.', checkbox: true},
        {q: 'Granted Google Ads access on each account (MCC link preferred)', note: 'Standard access. MCC link (Manager Account link) is faster than per-user access. To grant: ads.google.com > Admin > Access and Security > add ads@creeksidemarketingpros.com with Standard role. Or accept our MCC invite if we sent one.', checkbox: true},
        {q: 'Granted Meta Business Manager partner or admin access on Pixel + Ad Account', note: 'Partner access via our Business Manager ID 877081733504917 is preferred. To grant: business.facebook.com > Business Settings > Partners > Add > paste 877081733504917. Then assign your Pixel and Ad Account to us with admin permissions.', checkbox: true},
        {q: 'Granted Microsoft Ads access (if running)', note: 'Skip if not running Microsoft Ads. To grant: ads.microsoft.com > Tools > User management > Add user.', checkbox: true},
        {q: 'Granted TikTok Ads access (if running)', note: 'Skip if not running TikTok Ads. To grant: TikTok Ads Manager > Account > Account Info > User Management.', checkbox: true},
        {q: 'Granted CRM admin or developer role for integration setup', note: 'Confirmed admin level, not just login. Required to install Connected Apps and authorize API integrations. Method varies by CRM - your CRM admin will know the path.', checkbox: true},
        {q: 'Granted CRM sandbox access (if sandbox available)', note: 'Skip if no sandbox environment. Same access path as production CRM, just to the sandbox instance.', checkbox: true},
        {q: 'Granted CMS / website admin access with GTM injection ability', note: 'Permission to install plugins/apps AND edit code in the page head. On WordPress: Admin role. On Shopify: requires Theme + App Install permissions (separate). On other platforms: ask your developer.', checkbox: true},
        {q: 'Granted Hosting / DNS write access (if using server-side GTM)', note: '"Read access" is not enough. CNAME creation requires write. Skip if not using server-side GTM. Where to grant: your domain registrar or hosting panel (GoDaddy, Cloudflare, Namecheap, etc.).', checkbox: true},
        {q: 'Granted consent platform admin access', note: 'Skip if no CMP in use. Method varies by platform (OneTrust, Cookiebot, etc.) - check the platform User Management section.', checkbox: true},
        {q: 'Programmatic vendor tags delivered (actual tag JS / image / S2S spec)', note: 'Skip if not running programmatic. We need the implementation tag itself - JavaScript snippet, image pixel, or server-to-server postback spec. The vendor account contact alone is not enough.', checkbox: true},
        {q: 'Granted call tracking platform admin or analyst access (if applicable)', note: 'CallRail, CTM, etc. Skip if no call tracking. To grant: log in to the platform > Settings > Users > add ads@creeksidemarketingpros.com.', checkbox: true},
        {q: 'Granted cloud / data warehouse read access (if integrating BigQuery, Redshift, Snowflake)', note: 'Skip if no warehouse integration planned. Required only if we are building custom dashboards or attribution models that pull from your warehouse.', checkbox: true},
      ]
    },
    {
      title: '9. EXISTING TRACKING & TOOLS',
      subtitle: 'Tools you already have running. Helps us avoid duplicates and conflicts.',
      questions: [
        {q: 'Other analytics or behavior tools known to be deployed', note: 'Beyond Google Analytics. Common: Hotjar (heatmaps), Microsoft Clarity (free heatmaps + recordings), FullStory, Mouseflow, Pendo. Helps us avoid duplicate or conflicting deployments. Example: "Hotjar on the marketing site, Mixpanel in the app."'},
        {q: 'Looker Studio / BI dashboard platform in use', note: '"BI dashboard" = a tool that pulls data from multiple sources into one report. Common: Google Looker Studio (free), Tableau, Power BI, Domo. Tells us where existing reporting lives - we can extend or rebuild as needed.'},
        {q: 'BI dashboard internal owner (name)', note: 'Person on your side who built or maintains existing dashboards. We coordinate with them when adding new data sources. Example: "Mike Lee, IT Manager."'},
        {q: 'BigQuery export enabled?', note: '"BigQuery" = Google data warehouse. GA4 can automatically export raw event data to it for advanced analysis. Enables custom attribution models and ML modeling. To check: GA4 > Admin > Property Settings > BigQuery Links. If unsure, leave blank - we will check after GA4 access.', dropdown: ['Yes','No','Unsure']},
        {q: 'GTM server container in use?', note: '"Server-side GTM" = a more advanced tracking setup that runs in a server you control (rather than the visitor browser). Improves accuracy in a cookieless world but is non-trivial to set up. If yes, list hosting setup (Stape, Google Cloud, self-hosted). If unsure, you almost certainly do not have one - leave blank.', dropdown: ['Yes','No','Unsure']},
      ]
    },
    {
      title: '10. RISKS & OPEN QUESTIONS',
      subtitle: 'Anything unclear, blocked, or that needs follow-up before we can scope confidently.',
      questions: [
        {q: 'Free text - list anything you are unsure about or blocked on', note: 'No question is too small. Example: "Not sure if our IT will approve a Salesforce Connected App," "Pixel is currently being managed by another agency we are still working with," "We do not know the GTM password." Better to flag now than discover at launch.'},
      ]
    },
    {
      title: '11. SIGN-OFF',
      questions: [
        {q: 'Completed by (name, role)', note: 'Who filled out this form. Example: "Sarah Chen, Marketing Manager."'},
        {q: 'Date completed', note: 'When you finished filling this out. Example: "May 6, 2026."'},
      ]
    },
  ],
  footerNotes: [
    'If the site is not live yet, client-side tracking is gated until it is. We can use lead time to handle CRM and ad platform discovery in parallel.',
    '"Login access" to a CRM is not admin access. We need someone who can install a Connected App or equivalent - not just view records.',
    'If your CRM does not have a marketing automation tier (Sales Cloud only, HubSpot Free, etc.), offline conversion sync usually needs custom middleware. That changes cost and timeline.',
    'Programmatic vendors vary widely. Get the actual implementation guide from the vendor - not just "the pixel."',
    'For EU/UK markets, Consent Mode v2 is required. Plan CMP setup before tag deployment, not after.',
    'Healthcare and financial-services clients: ad platforms (especially Meta) restrict what conversion data can be collected. We will cover the implications on kickoff.',
    'Every unknown is a risk. "TBD" is a valid answer - flag who owns getting to a real answer and by when.',
  ]
};

// =====================================================================
// GENERAL INFO V2 CONTENT
// =====================================================================
const GENERAL_INFO_PART1 = {
  bannerTitle: 'CREEKSIDE MARKETING  |  CLIENT ONBOARDING - GENERAL INFO',
  bannerSubtitle: 'Fill in what you can. If unknown or not relevant, put "N/A." Reach out if you need help - that is what we are here for.',
  introLine: 'The more detail you can provide the better. We want to know your business as in-depth as we possibly can so the work we do reflects how you actually run it.',
  sections: [
    {
      title: '1. BUSINESS BASICS',
      questions: [
        {q: 'Business name', note: 'Legal entity name plus DBA if different. Example: "Smith Dental LLC dba Bright Smile Family Dental." Used in ad copy, billing, and contracts.'},
        {q: 'Business phone number', note: 'The number prospects will call after seeing an ad. Example: "(555) 123-4567 main line; (555) 123-4500 dedicated tracking number." If you use a separate tracking number, list both.'},
        {q: 'Business email', note: 'Primary contact email for the business (not personal). Used for invoices and account updates. Example: "billing@yourdomain.com" or "office@yourdomain.com."'},
        {q: 'Website + landing pages we will send traffic to', note: 'List every page where traffic should land. Include service-specific pages, contact pages, and any landing pages for promotions. Example: "yourdomain.com/implants, yourdomain.com/free-consultation." If you need custom landing pages built, flag it here.'},
        {q: 'Website platform / CMS', note: 'Tells us how we install tracking and request changes. Different platforms have different access levels (e.g., Shopify needs separate code-injection permission). Common: WordPress, Shopify, Webflow, Wix, Squarespace, custom.'},
        {q: 'CRM platform (if any)', note: 'Where you store leads and customer data. Drives whether we can sync ad performance with closed-won data. Common: Salesforce, HubSpot, GHL, Pipedrive, Zoho. Detailed CRM questions are in the Conversion Tracking tab.'},
      ]
    },
    {
      title: '2. DECISION-MAKING & COMMUNICATION',
      subtitle: 'Set the chain of command up front so creative and strategy reviews do not stall.',
      questions: [
        {q: 'Primary contact (name, email, role)', note: 'Day-to-day point of contact. Most communication will go through this person. Example: "Sarah Chen, sarah@yourdomain.com, Marketing Manager."'},
        {q: 'Marketing decision maker (if different from primary contact)', note: 'Person who signs off on strategy and creative. May or may not be on every call. Example: "Dr. Smith, owner - reviews creative on Fridays."'},
        {q: 'Sign-off authority - who needs to approve new creative, strategies, or budget changes', note: 'List names + roles. Avoids the "I love it but my partner needs to approve" delay cycle. Example: "Sarah for creative, Dr. Smith for budget changes over $500."'},
        {q: 'Backup contact if primary is unreachable for 48+ hours', note: 'Name + email. We use this when something is time-sensitive and the primary contact is OOO. Example: "Mike Lee, mike@yourdomain.com."'},
        {q: 'Check-in cadence preference', note: 'How often we sync. We will set the recurring meeting after kickoff. Most clients pick bi-weekly to start.', dropdown: ['Weekly','Bi-weekly','Monthly','On-demand']},
      ]
    },
    {
      title: '3. SERVICES & PRODUCTS',
      questions: [
        {q: 'Tell us about your business, product, service, or opportunity', note: 'The more information the better. Walk us through what you do, how you do it, and what makes the offer work. Long-form is welcome - we read every word and use it for ad copy and positioning.'},
        {q: 'Major problems (pain points) your product or service solves', note: 'In your customer language if possible (the words THEY use, not the words you use to describe them). Example: "I am tired of paying my accountant and never hearing back when I have questions." This becomes ad copy.'},
        {q: 'Services or products you want to advertise', note: 'List each. If you have multiple, rank them by priority - we lean budget toward what you mark #1.'},
        {q: 'Description of each service / product', note: 'A few sentences each. Cover what it is, who it is for, and what makes it valuable. Example: "Implants - $4,500 per tooth. For patients with one or more missing teeth who want a permanent solution. Our implant system uses a guided surgery technique that cuts recovery in half."'},
        {q: 'Average revenue per conversion type (rough estimates fine)', note: 'For dental: per-service averages ($4,500 implant, $99 cleaning). For mortgage: avg deal commission ($3,500/deal). For e-commerce: AOV ($65). Drives whether we use static or dynamic conversion values in tracking.'},
      ]
    },
    {
      title: '4. UNIT ECONOMICS',
      subtitle: 'Without these, our target cost-per-lead is a guess. Best-in-class agencies always ask.',
      questions: [
        {q: 'Average customer lifetime value (CLV / LTV) in $', note: 'How much a typical customer is worth over their entire relationship with you. If unsure, take avg purchase value times typical retention period. Example: dental practice might be "$1,200 first year, $800/year ongoing, average retention 6 years = $5,200 LTV."'},
        {q: 'Current customer acquisition cost (CAC) in $ - if known', note: 'Across all marketing, not just paid ads. Example: "We spend $4K/month on all marketing and acquire 8 new customers, so CAC is $500." If unsure, leave blank.'},
        {q: 'Gross margin % on the product / service we are advertising', note: 'Drives realistic ROAS targets - we cannot promise 4x ROAS if your margin is 25%, but at 60% margin we can be aggressive. Example: "60% on bookkeeping, 80% on tax planning."'},
        {q: 'Average sales cycle length', note: 'How long it takes from first contact to closed deal. Days, weeks, or months. Example: "30 days for cleanings, 90 days for implants." Drives which conversion-tracking method we set up: Google Ads offline conversion import supports up to a 90-day click window; Meta CAPI defaults to a 7-day click window. Sales cycles longer than 90 days require a custom approach (manual matching, longer attribution, or a CRM-driven workaround).'},
      ]
    },
    {
      title: '5. GOALS & SUCCESS',
      subtitle: 'Force the tradeoff up front so "increase leads" stops being meaningless.',
      questions: [
        {q: '90-day success statement: "In 90 days, this engagement is a success if ___."', note: 'One sentence. Specific and outcome-based. Example: "We are getting 25 qualified consult-bookings per month at under $90 cost per booking, with at least 40% closing."'},
        {q: 'Tradeoff: in the next 90 days, which matters more?', note: 'Pick one. The forced choice is the point - if you cannot pick, we will optimize toward whichever default is more efficient.', dropdown: ['A - Lower CPA / better efficiency, even if volume drops','B - More conversions, even if CPA rises','Mix - depends on the campaign']},
        {q: 'Specific milestones in next 6-12 months', note: 'Revenue targets, expansion to new locations, hiring sales staff, launching a new service. Example: "Open second location in Q3, scale to $1.2M annual revenue." We pace ad spend to support these.'},
        {q: 'Ideal cost per lead or cost per customer', note: 'Tied to the unit economics above. Example: "Up to $80 CPL on implants, up to $20 CPL on cleanings." This is what we optimize toward.'},
      ]
    },
    {
      title: '6. TARGET AUDIENCE & GEOGRAPHY',
      subtitle: 'Customer personas live on Part 2 (separate tab) - that is where the multi-column persona table goes.',
      questions: [
        {q: 'Geographic markets we should FOCUS on (and why)', note: 'Where do you want to concentrate spend? Why these areas? Example: "ZIP codes 90210, 90211, 90212 - highest concentration of high-income households we serve." We can layer in radius-targeting around your physical location too.'},
        {q: 'Hours your business can answer the phone', note: 'Affects ad scheduling for call-driving campaigns. We can pause ads outside answer hours to avoid wasted spend. Example: "Mon-Thu 8am-5pm PT, Fri 8am-12pm PT, closed weekends."'},
        {q: 'Specific keywords or phrases you want us to target (comma-separated)', note: 'Optional. We will research keywords ourselves, but if you have ones you know convert (or competitor branded terms you want to bid on), list them here. Example: "dental implants near me, same-day implants, all-on-four cost."'},
        {q: 'Seasonal trends, key events, or launches to plan around', note: 'Holidays you close, peak demand months, conferences, regulatory dates, product launches. Example: "January peak for cosmetic dentistry, June peak for back-to-school, closed last week of December." Helps us pace budget across the year.'},
      ]
    },
    {
      title: '7. COMPETITION & HISTORY',
      subtitle: 'Differentiators, top competitors, and common objections all live on Part 2 (separate tab) as multi-column tables. This section covers the simpler items.',
      questions: [
        {q: 'Alternatives (NOT direct competitors) - what else does your customer consider?', note: 'Things customers compare you to that are not in your category. Example for a CPA firm: Pilot, Bench, QuickBooks Online, doing it themselves. Most clients confuse alternatives with competitors. The split matters for ad strategy because we have to argue against the alternative, not just the competitor.'},
        {q: 'Anything competitors do advertising-wise we should replicate', note: 'Specific ads, offers, hooks, or angles you have seen them use that resonated. Example: "Their before/after Instagram reels get tons of engagement."'},
        {q: 'Anything competitors do advertising-wise we should avoid', note: 'Tactics or claims that feel off-brand or that you have seen backfire in your space. Example: "Heavy discounting tarnishes the brand in our segment."'},
        {q: 'Have you worked with a marketing agency before?', note: 'The follow-up below is conditional on yes.', dropdown: ['Yes','No']},
        {q: 'If yes - what did they do well, what did they do poorly, what should we NOT repeat?', note: 'Skip if you answered No above. Be specific - examples that help us most: "They never explained what they were testing or why," or "They reported on impressions but never on revenue."'},
      ]
    },
    {
      title: '8. LEAD QUALITY & CRM LOOP',
      subtitle: 'Especially important for dental, mortgage, home services. Paid ads can hit cost-per-lead targets by sending low-quality leads if no one closes the loop on what is actually qualified. Sales process steps live on Part 2.',
      questions: [
        {q: 'How do you define a qualified lead?', note: 'One sentence. Example: "Business owner with $250K+ annual revenue looking for monthly bookkeeping and tax planning, located in Michigan or open to remote." This becomes our targeting criteria.'},
        {q: 'How will we know which leads turn into paying customers', note: 'CRM stage updates, sales notifications, manual reporting, etc. Drives our optimization toward closed-won not just form fills. Example: "We tag leads as Qualified, Booked, Showed, Closed in HubSpot."'},
        {q: 'Can we plug into your CRM for lead-quality data, or do you tag leads manually', note: 'API integration / Zapier / manual exports / no integration. Affects how often we get feedback and how granular it is.'},
        {q: 'Will sales / intake team give us monthly lead-quality feedback (closed-won %, junk-lead %)', note: 'Even rough numbers help. Without lead-quality feedback, we optimize blind toward volume - which usually drops quality over time.'},
      ]
    },
    {
      title: '9. BRAND SAFETY & RESTRICTIONS',
      questions: [
        {q: 'Restricted terms / keywords to avoid', note: 'Legal, partner, trademark, or competitor restrictions. Anything we should never include in ad copy or bid on.'},
        {q: 'Topics or claims we cannot make in copy', note: 'Regulatory or compliance restrictions. Especially relevant for healthcare, finance, legal.'},
        {q: 'Seasonal blackouts when ads should be paused', note: 'Holidays you close, periods of high inventory shortage, regulatory blackouts, etc.'},
      ]
    },
    {
      title: '10. CREATIVE ASSETS & BRAND',
      questions: [
        {q: 'Brand colors', note: 'Hex codes preferred. If unsure, attach a brand guide or sample image to the shared folder.'},
        {q: 'Brand fonts', note: 'Primary + secondary if different. Note any font we are not licensed to use.'},
        {q: 'Who reviews ad creative on your side', note: 'Name + role. The person who has final say on whether a creative goes live.'},
        {q: 'Existing creative assets', note: 'Photos, videos, testimonials, brand guidelines. Upload to the shared folder when you confirm in the next section.'},
        {q: 'Tone notes (if any)', note: 'Friendly / authoritative / playful / professional. Or specific phrasing we should use or avoid.'},
      ]
    },
    {
      title: '11. PROMOTIONS & OFFERS',
      questions: [
        {q: 'Current promotions we can run in ads', note: 'Active discounts, free consultations, limited-time offers. List dates if applicable.'},
        {q: 'Customer or lead lists for remarketing (over 1,000 contacts)', note: 'Email to ads@creeksidemarketingpros.com if available. Used for Customer Match (Google) and Custom Audiences (Meta).'},
        {q: '100%-off coupon code for purchase-event tracking tests (e-commerce only)', note: 'Lets us test conversion tracking end-to-end without real charges. Skip if not e-commerce.'},
      ]
    },
    {
      title: '12. BILLING',
      questions: [
        {q: 'Monthly ad budget', note: 'Total spend across all platforms. We will allocate by channel after kickoff.'},
      ]
    },
    {
      title: '13. ASSETS & ACCESS - CHECK OFF AS YOU COMPLETE',
      subtitle: 'Confirmation checkboxes for items handled outside this form. CRM admin access and detailed ad-account access specs (with permission levels) live in the Conversion Tracking tab. Platform-specific account IDs live in the Google Info Form and Meta Info Form tabs.',
      questions: [
        {q: 'Uploaded images, logos, creative assets to the shared folder', note: 'Logos in PNG and SVG if possible. Photos at highest available resolution.', checkbox: true},
        {q: 'Uploaded past campaign data, market research, or analytics exports (if available)', note: 'Optional. Past performance data accelerates our audit.', checkbox: true},
        {
          dualCheckboxHeader: true,
          questionLabel: 'Item (click the link for setup help)',
          primaryLabel: 'Done / shared with us',
          secondaryLabel: "I don't have one - please set it up for me",
        },
        {
          q: 'Shared a Google Drive folder with ads@creeksidemarketingpros.com for project assets',
          note: 'A single folder we both have access to is faster than emailing files back and forth.',
          helpUrl: 'https://support.google.com/drive/answer/7166529',
          helpUrlText: 'How to share a Google Drive folder',
          dualCheckbox: true,
        },
        {
          q: 'Added ads@creeksidemarketingpros.com to your Google Business Profile (if you have a physical location)',
          note: 'Lets us link the profile to Google Ads for location extensions and call tracking. Skip if no physical location.',
          helpUrl: 'https://support.google.com/business/answer/3403100',
          helpUrlText: 'How to add a manager to Google Business Profile',
          dualCheckbox: true,
        },
        {
          q: 'Connected ads@creeksidemarketingpros.com as a manager on your Meta Business Page',
          note: 'Required so we can boost posts, link the page to ads, and pull native page insights. Note: this grants access to the Facebook Page itself and is separate from the Business Manager partner connection in the Conversion Tracking tab. Both are needed for full Meta access.',
          helpUrl: 'https://www.facebook.com/business/help/186228491178889',
          helpUrlText: 'How to add a page admin in Meta Business Suite',
          dualCheckbox: true,
        },
      ]
    },
  ],
  footerNotes: [
    'Part 2 (separate tab) holds the multi-column strategy tables: customer personas, differentiators, top competitors, common objections, and sales process steps. Fill those in after you finish Part 1.',
    'Conversion Tracking deep-dive (CRM access, GTM, ad-account permission levels, consent setup) is on a separate tab.',
    'Platform-specific account IDs (Google Ads, Meta) are on the Google Info Form and Meta Info Form tabs.',
    'If you are stuck on any item, leave it blank and we will cover it on the kickoff call.',
  ]
};


// =====================================================================
// PART 2 - STRATEGY TABLES (multi-column, on its own tab)
// =====================================================================

/**
 * Renders a tab with one or more multi-column input tables.
 * Each table has its own column-header row, an italic example row, and N empty input rows.
 * Different tables can have different column counts; we pad to the max.
 */
function buildStrategyTablesTab_(ss, sheetName, content) {
  const existing = ss.getSheetByName(sheetName);
  if (existing) ss.deleteSheet(existing);
  const sheet = ss.insertSheet(sheetName);

  // Find max columns across all tables
  const maxCols = Math.max(...content.tables.map(t => t.columns.length));
  const SPACER_COL_WIDTH = 30;
  const TOTAL_CONTENT_WIDTH = 1200;
  const colWidth = Math.floor(TOTAL_CONTENT_WIDTH / maxCols);

  // Column 1 = spacer; cols 2 through (maxCols+1) = content
  sheet.setColumnWidth(1, SPACER_COL_WIDTH);
  for (let i = 0; i < maxCols; i++) {
    sheet.setColumnWidth(i + 2, colWidth);
  }
  // Hide unused right columns
  if (sheet.getMaxColumns() > maxCols + 1) {
    sheet.hideColumns(maxCols + 2, sheet.getMaxColumns() - (maxCols + 1));
  }

  let row = 1;

  // Row 1 spacer
  sheet.setRowHeight(row, STYLE.bannerTopRowHeight);
  row++;

  // Banner row
  const bannerRange = sheet.getRange(row, 2, 1, maxCols).merge();
  bannerRange.setBackground(STYLE.bannerBg);
  bannerRange.setHorizontalAlignment('center');
  bannerRange.setVerticalAlignment('middle');
  bannerRange.setFontFamily(STYLE.fontFamily);
  bannerRange.setWrap(true);
  const richText = SpreadsheetApp.newRichTextValue()
    .setText(content.bannerTitle + '\n' + content.bannerSubtitle)
    .setTextStyle(0, content.bannerTitle.length,
      SpreadsheetApp.newTextStyle().setBold(true).setFontSize(16).setForegroundColor(STYLE.bannerFg).build())
    .setTextStyle(content.bannerTitle.length + 1, content.bannerTitle.length + 1 + content.bannerSubtitle.length,
      SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(10).setForegroundColor(STYLE.bannerSubFg).build())
    .build();
  bannerRange.setRichTextValue(richText);
  sheet.setRowHeight(row, STYLE.bannerRowHeight);
  row++;

  // Optional intro line
  if (content.introLine) {
    const intro = sheet.getRange(row, 2, 1, maxCols).merge();
    intro.setValue(content.introLine);
    intro.setBackground('#F0F4F7');
    intro.setFontColor('#444444');
    intro.setFontStyle('italic');
    intro.setFontSize(9);
    intro.setHorizontalAlignment('center');
    intro.setVerticalAlignment('middle');
    intro.setFontFamily(STYLE.fontFamily);
    sheet.setRowHeight(row, 22);
    row++;
  }

  // Spacer row
  sheet.setRowHeight(row, 8);
  row++;

  // Loop tables
  for (const table of content.tables) {
    const numCols = table.columns.length;

    // Table title bar (merged across this table's columns)
    const titleRange = sheet.getRange(row, 2, 1, maxCols).merge();
    const titleText = table.title + (table.subtitle ? '   |   ' + table.subtitle : '');
    titleRange.setBackground(STYLE.sectionBg);
    titleRange.setFontColor(STYLE.sectionFg);
    titleRange.setHorizontalAlignment('left');
    titleRange.setVerticalAlignment('middle');
    titleRange.setFontFamily(STYLE.fontFamily);
    titleRange.setWrap(true);
    if (table.subtitle) {
      const tlen = table.title.length;
      const slen = '   |   '.length;
      const subLen = table.subtitle.length;
      const richTitle = SpreadsheetApp.newRichTextValue()
        .setText(titleText)
        .setTextStyle(0, tlen,
          SpreadsheetApp.newTextStyle().setBold(true).setFontSize(12).setForegroundColor(STYLE.sectionFg).build())
        .setTextStyle(tlen, tlen + slen + subLen,
          SpreadsheetApp.newTextStyle().setBold(false).setItalic(true).setFontSize(10).setForegroundColor('#555555').build())
        .build();
      titleRange.setRichTextValue(richTitle);
    } else {
      titleRange.setValue(titleText);
      titleRange.setFontWeight('bold');
      titleRange.setFontSize(12);
    }
    titleRange.setBorder(null, null, true, null, false, false, STYLE.sectionAccent, SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setRowHeight(row, STYLE.sectionRowHeight);
    row++;

    // Column headers
    const headerCells = sheet.getRange(row, 2, 1, numCols);
    headerCells.setValues([table.columns]);
    headerCells.setBackground('#1F1F1F');
    headerCells.setFontColor('#FFFFFF');
    headerCells.setFontWeight('bold');
    headerCells.setFontSize(10);
    headerCells.setHorizontalAlignment('left');
    headerCells.setVerticalAlignment('middle');
    headerCells.setFontFamily(STYLE.fontFamily);
    headerCells.setWrap(true);
    headerCells.setBorder(true, true, true, true, false, false, '#1F1F1F', SpreadsheetApp.BorderStyle.SOLID);
    // Pad remaining columns with grey block (visual end-of-table marker)
    if (numCols < maxCols) {
      const padRange = sheet.getRange(row, 2 + numCols, 1, maxCols - numCols);
      padRange.setBackground('#E5E7EA');
    }
    sheet.setRowHeight(row, STYLE.columnHeaderHeight);
    row++;

    // Example row (italic, light fill)
    if (table.example && table.example.length === numCols) {
      const exCells = sheet.getRange(row, 2, 1, numCols);
      exCells.setValues([table.example]);
      exCells.setBackground('#FFFBEA');
      exCells.setFontStyle('italic');
      exCells.setFontColor('#7A6502');
      exCells.setFontSize(9);
      exCells.setFontFamily(STYLE.fontFamily);
      exCells.setVerticalAlignment('middle');
      exCells.setWrap(true);
      if (numCols < maxCols) {
        sheet.getRange(row, 2 + numCols, 1, maxCols - numCols).setBackground('#E5E7EA');
      }
      sheet.setRowHeight(row, 48);
      row++;
    }

    // Empty input rows
    const numInputRows = table.rowsForInput || 3;
    let alt = false;
    for (let r = 0; r < numInputRows; r++) {
      const fill = alt ? STYLE.questionAltB : STYLE.questionAltA;
      alt = !alt;
      const inputCells = sheet.getRange(row, 2, 1, numCols);
      inputCells.setBackground(fill);
      inputCells.setVerticalAlignment('middle');
      inputCells.setFontFamily(STYLE.fontFamily);
      inputCells.setFontSize(10);
      inputCells.setWrap(true);
      // Last-column dropdown (per-table option)
      if (table.lastColumnDropdown && table.lastColumnDropdown.length > 0) {
        const ddCell = sheet.getRange(row, 2 + numCols - 1);
        const rule = SpreadsheetApp.newDataValidation()
          .requireValueInList(table.lastColumnDropdown, true)
          .setAllowInvalid(false)
          .build();
        ddCell.setDataValidation(rule);
      }
      // Pad remaining columns
      if (numCols < maxCols) {
        sheet.getRange(row, 2 + numCols, 1, maxCols - numCols).setBackground('#E5E7EA');
      }
      // Subtle bottom border between input rows
      const rowBorderCells = sheet.getRange(row, 2, 1, numCols);
      rowBorderCells.setBorder(null, null, true, null, false, false, STYLE.rowBorder, SpreadsheetApp.BorderStyle.SOLID);
      sheet.setRowHeight(row, STYLE.questionRowHeight);
      row++;
    }

    // Spacer between tables
    sheet.setRowHeight(row, 18);
    row++;
  }

  // Footer notes
  if (content.footerNotes && content.footerNotes.length) {
    const footerHeader = sheet.getRange(row, 2, 1, maxCols).merge();
    footerHeader.setValue('NOTES');
    footerHeader.setBackground('#1F1F1F');
    footerHeader.setFontColor('#FFFFFF');
    footerHeader.setFontWeight('bold');
    footerHeader.setFontSize(10);
    footerHeader.setHorizontalAlignment('left');
    footerHeader.setVerticalAlignment('middle');
    footerHeader.setFontFamily(STYLE.fontFamily);
    sheet.setRowHeight(row, 24);
    row++;
    for (const note of content.footerNotes) {
      const noteRange = sheet.getRange(row, 2, 1, maxCols).merge();
      noteRange.setValue('>>  ' + note);
      noteRange.setBackground('#FAFAFA');
      noteRange.setFontColor('#333333');
      noteRange.setFontSize(9);
      noteRange.setFontFamily(STYLE.fontFamily);
      noteRange.setVerticalAlignment('middle');
      noteRange.setWrap(true);
      noteRange.setFontStyle('italic');
      noteRange.setBorder(null, true, null, null, false, false, STYLE.bannerBg, SpreadsheetApp.BorderStyle.SOLID_THICK);
      sheet.setRowHeight(row, 30);
      row++;
    }
  }

  sheet.setFrozenRows(content.introLine ? 4 : 3);
  sheet.setHiddenGridlines(true);
  return sheet;
}


// =====================================================================
// GENERAL INFO PART 2 - STRATEGY TABLES CONTENT
// =====================================================================
const GENERAL_INFO_PART2 = {
  bannerTitle: 'CREEKSIDE MARKETING  |  GENERAL INFO PART 2 - STRATEGY TABLES',
  bannerSubtitle: 'Each table below has its own column headers. Fill in one row per item. Use the gold example row as a guide, then add your own answers in the rows below it.',
  introLine: 'Skip rows you do not need - we only use what you fill in. The dropdown in the Differentiators table is the only field with a fixed answer set.',
  tables: [
    {
      title: '1. CUSTOMER PERSONAS',
      subtitle: 'Different types of customers you serve. Drives ad copy, audience targeting, and creative.',
      columns: [
        'Persona name + 1-line description',
        'Common traits (age, income, job title, interests)',
        'How they describe their problem (in their own words)',
        'What triggers them to want or need your service'
      ],
      example: [
        'Established Dentist - practice owner with 1-3 locations',
        'Age 35-60, $250K+ income, dentist, time-poor',
        'I cannot get my accountant to call me back. They send me a tax bill and I have no idea why it is so high.',
        'Tax season approaching, opening a new practice location, or losing trust in their current accountant'
      ],
      rowsForInput: 4
    },
    {
      title: '2. DIFFERENTIATORS',
      subtitle: 'What makes you better than alternatives. The third column drives whether we explain it in the ad or just claim it.',
      columns: [
        'Differentiator (what is it?)',
        'Why it matters to the customer (the benefit, not the feature)',
        'Do customers understand this is an advantage?'
      ],
      example: [
        'We do tax planning, not just tax prep',
        'Saves them $5K-$50K a year through proactive strategy, not just filing',
        'Yes'
      ],
      lastColumnDropdown: ['Yes','No','Unsure'],
      rowsForInput: 4
    },
    {
      title: '3. TOP COMPETITORS',
      subtitle: 'Direct competitors in your space. Forces you to think about WHY they are competition - shapes how we position against them.',
      columns: [
        'Competitor name + website',
        'Why are they a top competitor? (price, geography, brand, specific service)'
      ],
      example: [
        'Dental Care of Beverly Hills - dentalcarebh.com',
        'Same neighborhood, lower-priced cleanings, strong Google Reviews'
      ],
      rowsForInput: 4
    },
    {
      title: '4. COMMON OBJECTIONS',
      subtitle: 'What prospects push back on, and your standard response. Becomes ad copy and landing-page content.',
      columns: [
        'What prospects say (the objection, in their words)',
        'Your standard response on a sales call'
      ],
      example: [
        'Your pricing is higher than the firm down the street.',
        'Our pricing reflects everything included - bookkeeping plus tax prep plus tax planning. Most firms charge separately for each.'
      ],
      rowsForInput: 4
    },
    {
      title: '5. SALES PROCESS STEPS',
      subtitle: 'The path from first contact to closed deal. Tells us where to wire conversion tracking and what counts as which stage.',
      columns: [
        'Step #',
        'What happens during this step?',
        'Software used (if any)'
      ],
      example: [
        '1',
        'Initial consultation call to understand needs and quote fee',
        'Calendly + Microsoft Teams'
      ],
      rowsForInput: 6
    },
  ],
  footerNotes: [
    'Fill out this tab AND Part 1 (separate tab) to give us the full picture.',
    'If a table has rows you do not need, leave them blank - we only use what you fill in.',
  ]
};


// =====================================================================
// GOOGLE INFO FORM CONTENT
// =====================================================================
const GOOGLE_INFO_FORM = {
  bannerTitle: 'CREEKSIDE MARKETING  |  GOOGLE PLATFORM INFO',
  bannerSubtitle: 'Share Google Ads, Google Business Profile, Search Console, and Merchant Center access with us. Click the linked guides if you need step-by-step help.',
  introLine: 'We grant access to ads@creeksidemarketingpros.com. If you do not have an account on a given property, check the right-hand box and we will set it up for you.',
  sections: [
    {
      title: 'START HERE - WALKTHROUGH RESOURCES',
      subtitle: 'Click each link to open it in a new tab. Watch the setup video first if you need to create a Google Ads account, then use the access walkthrough as you fill in section 1.',
      questions: [
        {
          resourceLink: true,
          label: 'GOOGLE ADS ACCOUNT SETUP VIDEO',
          url: 'https://youtu.be/csnnRDqoFe0',
          description: 'Use this only if you do not have a Google Ads account yet. Skip if your account already exists.',
        },
        {
          resourceLink: true,
          label: 'WALKTHROUGH - FIND YOUR GOOGLE ADS ID + APPROVE OUR ACCESS REQUEST',
          url: 'https://www.loom.com/share/e9d3a6d95ac9408d94bb3c0ff52e786b',
          description: 'Loom video showing exactly where your 10-digit Account ID lives and how to approve the invite we send.',
        },
      ]
    },
    {
      title: '1. GOOGLE ADS',
      subtitle: 'The main ad account ID and access approval.',
      questions: [
        {q: '10-digit Google Ads Account ID', note: 'Format: 123-456-7890. To find it: log in to ads.google.com - the ID is in the top-right corner. If you need help setting up an account from scratch, see the setup video at the top of this tab.'},
        {q: 'Approved Creekside access request on the Google Ads account', note: 'After you share your Account ID with us, we will send an access invite. Open ads.google.com > Admin > Access and Security > approve the pending invite from ads@creeksidemarketingpros.com. The walkthrough video at the top of this tab covers the full flow.', checkbox: true},
      ]
    },
    {
      title: '2. GOOGLE PROPERTIES - SHARE OR REQUEST SETUP',
      subtitle: 'For each property: check the LEFT box if access is shared, or the RIGHT box if you do not have one and want us to set it up for you.',
      questions: [
        {
          dualCheckboxHeader: true,
          questionLabel: 'Property (click the link for setup help)',
          primaryLabel: 'Done / shared with ads@creeksidemarketingpros.com',
          secondaryLabel: "I don't have one - please set it up for me",
        },
        {
          q: 'Shared Google Business Profile (formerly Google My Business)',
          note: 'Required if you have a physical location. Lets us link the profile to Google Ads for location extensions, call tracking, and local campaigns.',
          helpUrl: 'https://youtu.be/GWO-8PDviN4',
          helpUrlText: 'How to share access to Google Business Profile (video)',
          dualCheckbox: true,
        },
        {
          q: 'Shared Google Search Console',
          note: 'Optional but useful. Gives us SEO query data we can pair with paid-search performance. If you do not have one, share access to your domain hosting platform instead and we will register it.',
          helpUrl: 'https://support.google.com/webmasters/answer/7687615',
          helpUrlText: 'How to add a Search Console user',
          dualCheckbox: true,
        },
        {
          q: 'Shared Google Merchant Center',
          note: 'Required only for Shopping Ads / e-commerce campaigns. Skip if you are not running Shopping. If you have a product feed but no Merchant Center, we will create one.',
          helpUrl: 'https://support.google.com/merchants/answer/12160472',
          helpUrlText: 'How to manage Merchant Center users',
          dualCheckbox: true,
        },
      ]
    },
  ],
  footerNotes: [
    'Account-level permission specs (admin vs editor vs publish) are in the Conversion Tracking tab.',
    'Programmatic / DV360 / non-Google Ads platforms are covered separately - we will discuss on the kickoff call.',
    'If a video link is not loading for you, message us and we will send a fresh one.',
  ]
};


// =====================================================================
// META INFO FORM CONTENT
// =====================================================================
const META_INFO_FORM = {
  bannerTitle: 'CREEKSIDE MARKETING  |  META PLATFORM INFO',
  bannerSubtitle: 'Share Meta Business Manager, Page, Ad Account, and Pixel access. Use the linked guides for step-by-step help on each grant.',
  introLine: 'Our Business Partner ID is 877081733504917. The recommended path is to send a partner invite, then confirm asset-level access for each item below.',
  sections: [
    {
      title: 'START HERE - WALKTHROUGH RESOURCES',
      subtitle: 'Click each link to open it in a new tab. Watch the video first, then use the guide and FAQ as you work through the form.',
      questions: [
        {
          resourceLink: true,
          label: 'WATCH THIS SHORT VIDEO BEFORE YOU START',
          url: 'https://youtu.be/Gbo_LZTKmgc',
          description: '1 min 19 sec. Walks through what you are about to do and why FULL access matters.',
        },
        {
          resourceLink: true,
          label: 'USE THIS ONBOARDING GUIDE TO WALK YOU THROUGH SHARING YOUR ACCOUNT',
          url: 'https://drive.google.com/file/d/1TN_1JNfmucB1kPJtRqDHh4RWmyDKlzP2/view?usp=drive_link',
          description: 'Step-by-step PDF for granting Creekside access in Meta Business Manager.',
        },
        {
          resourceLink: true,
          label: 'THESE FAQs CAN HELP YOU IF YOU GET STUCK',
          url: 'https://drive.google.com/open?id=1knf-dE9KbGGTOjfte7T5aH7Qh43jQpE1',
          description: 'Common questions and gotchas. If you hit a wall, check this first.',
        },
      ]
    },
    {
      title: '1. GETTING STARTED',
      subtitle: 'A Meta / Facebook Business Account is the parent container for everything else. If you do not have one, we cannot proceed until it exists.',
      questions: [
        {q: 'Do you have a Meta / Facebook Business Account?', note: 'A Business Account is different from a personal Facebook profile. To check: go to business.facebook.com - if you can log in and see a dashboard with assets, you have one. If not, pick "No" below and we will help you create one.', dropdown: ['Yes','No - need help setting one up','Unsure']},
        {q: 'Watched the onboarding videos / read the FAQ guide before starting', note: 'Optional. The videos walk through every grant step in this form. Setup video: business.facebook.com onboarding video. Onboarding guide: Meta Business Suite help center. FAQ: facebook.com/business/help.', checkbox: true},
      ]
    },
    {
      title: '2. PARTNER + ADMIN ACCESS',
      subtitle: 'The fastest path: add Creekside as a partner, then assign each asset to us via Business Manager. Email-based access is a fallback if partner access is blocked.',
      questions: [
        {q: 'Sent partner invite using Creekside Business ID 877081733504917', note: 'To grant: business.facebook.com > Business Settings > Partners > Add > paste 877081733504917 > assign assets (Pixel, Ad Account, Page) with admin permissions. This is the preferred method - covers everything in one shot.', checkbox: true},
        {q: 'Granted email-based admin access (fallback) to peterson@ AND ads@creeksidemarketingpros.com', note: 'Optional - skip if Partner ID access above is granted. Some clients prefer email-based access. To grant: Business Settings > People > Add > paste both emails > assign Admin role.', checkbox: true},
      ]
    },
    {
      title: '3. ASSET-LEVEL ACCESS - SHARE OR REQUEST SETUP',
      subtitle: 'For each asset: confirm full access is shared with Creekside, OR check the right-hand box if you do not have it and want us to set it up.',
      questions: [
        {
          dualCheckboxHeader: true,
          questionLabel: 'Asset (click the link for setup help)',
          primaryLabel: 'Full access shared with us',
          secondaryLabel: "I don't have one - please set it up for me",
        },
        {
          q: 'Facebook Business Page',
          note: 'Required for boosted posts, Page-linked ads, and native Page insights. Granted via Business Settings > Pages > Add > assign Page Admin role to ads@creeksidemarketingpros.com.',
          helpUrl: 'https://www.facebook.com/business/help/186228491178889',
          helpUrlText: 'How to add a Page admin in Meta Business Suite',
          dualCheckbox: true,
        },
        {
          q: 'Meta Ad Account',
          note: 'Required - this is where campaigns run. Granted via Business Settings > Accounts > Ad Accounts > Add > assign with admin permissions.',
          helpUrl: 'https://www.facebook.com/business/help/2169003770027706',
          helpUrlText: 'How to assign Ad Account access',
          dualCheckbox: true,
        },
        {
          q: 'Meta Pixel',
          note: 'Required for conversion tracking. Granted via Events Manager > select pixel > Settings > Assign Partners. If no pixel exists, we will create one.',
          helpUrl: 'https://www.facebook.com/business/help/952192354843755',
          helpUrlText: 'How to share a Meta Pixel',
          dualCheckbox: true,
        },
        {
          q: 'Instagram Account',
          note: 'Required only if running Instagram-placement ads or boosting Instagram posts. Granted via Business Settings > Accounts > Instagram accounts > Add > assign with full control.',
          helpUrl: 'https://www.facebook.com/business/help/898752960195806',
          helpUrlText: 'How to add an Instagram account to Business Manager',
          dualCheckbox: true,
        },
        {
          q: 'Other assets (Catalog, App, WhatsApp, etc.)',
          note: 'Skip if not applicable. Catalog is required for Advantage+ Shopping or dynamic product ads. Apps and WhatsApp are platform-specific. List anything else we need access to in the Notes/Help column on the right of this row.',
          helpUrl: 'https://www.facebook.com/business/help',
          helpUrlText: 'Meta Business Help Center',
          dualCheckbox: true,
        },
      ]
    },
    {
      title: '4. ACCOUNT IDS + BILLING',
      subtitle: 'A few specifics we need for setup.',
      questions: [
        {q: 'Facebook Business Page name', note: 'The full name as it appears on Facebook. Example: "Smith Dental - Bright Smile Family Dental." Helps us confirm the correct page is linked.'},
        {q: 'Meta Ad Account ID', note: 'Starts with "act_" then a number. Find it in Ads Manager URL or in Business Settings > Accounts > Ad Accounts. Example: act_1234567890.'},
        {q: 'Added a payment method to the ad account', note: 'Required before any campaign can run. Add via Ads Manager > Billing > Payment Methods > Add new payment method. Without this, campaigns will save but never spend.', checkbox: true},
        {q: 'Confirmed business phone number is correct in Business Settings', note: 'Meta uses this for ad account verification and account-level support. Update via Business Settings > Business Info > Edit business info.', checkbox: true},
      ]
    },
  ],
  footerNotes: [
    'Partner-access via Business ID 877081733504917 is the preferred path - it grants everything in one step.',
    'If a help URL does not load for you, the Meta Business Help Center has a search bar that will find an updated version.',
    'For agency accounts where the client does not own their Business Manager, message us before starting - we will need a different access approach.',
  ]
};
