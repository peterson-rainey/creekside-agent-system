// ============================================================
// Creekside Marketing -- Google Calendar to GHL Booking Sync
//
// Polls Cade's Google Calendar every 5 minutes for new
// appointment bookings. Matches attendee email to GHL contacts.
//   - Found: adds "call-booked" tag
//   - Not found: creates new contact with "call-booked" tag
// Sends error email to Peterson on failure.
//
// SETUP:
//   1. Open script.google.com, create a new project
//   2. Paste this entire file into Code.gs
//   3. Run setApiKey() once -- enter your GHL API key when prompted
//   4. Run setupTrigger() once -- creates the 5-minute poll
//   5. Run testManual() to verify it works
// ============================================================

// -- Configuration --
const CONFIG = {
  GHL_LOCATION_ID: 'pNy8KMWRuGF2sGihGTMo',
  GHL_BASE_URL: 'https://services.leadconnectorhq.com',
  GHL_API_VERSION: '2021-07-28',

  // Cade's Google Calendar (his email = calendar ID)
  CALENDAR_ID: 'cade@creeksidemarketingpros.com',

  // Team emails to exclude from attendee matching
  OWNER_EMAILS: [
    'cade@creeksidemarketingpros.com',
    'peterson@creeksidemarketingpros.com',
  ],

  // Who gets error notifications
  ERROR_NOTIFY_EMAIL: 'peterson@creeksidemarketingpros.com',

  // Tag to apply when a booking is detected
  TAG_CALL_BOOKED: 'call-booked',

  // How far back to look on first run (hours)
  INITIAL_LOOKBACK_HOURS: 24,

  // How far ahead to scan for upcoming booked events (days)
  LOOKAHEAD_DAYS: 60,
};


// ============================================================
// Main function (called by time-driven trigger every 5 min)
// ============================================================

function syncNewBookings() {
  try {
    const lastRun = getLastRunTime();
    const now = new Date();
    const apiKey = getApiKey();

    const calendar = CalendarApp.getCalendarById(CONFIG.CALENDAR_ID);
    if (!calendar) {
      throw new Error('Calendar not found: ' + CONFIG.CALENDAR_ID);
    }

    // Fetch events from now through 60 days out
    const endDate = new Date(now.getTime() + CONFIG.LOOKAHEAD_DAYS * 24 * 60 * 60 * 1000);
    const events = calendar.getEvents(now, endDate);

    let processed = 0;
    let tagged = 0;
    let created = 0;

    for (const event of events) {
      // Skip events created before last run
      if (event.getDateCreated() < lastRun) continue;

      // Skip events already processed
      const eventId = event.getId();
      if (isEventProcessed(eventId)) continue;

      // Get external attendees only
      const attendees = event.getGuestList()
        .filter(function(g) {
          return g.getEmail() &&
            CONFIG.OWNER_EMAILS.indexOf(g.getEmail().toLowerCase()) === -1;
        });

      if (attendees.length === 0) {
        markEventProcessed(eventId);
        continue;
      }

      // Grab appointment details for the contact note
      var eventStart = event.getStartTime();
      var eventTitle = event.getTitle() || 'Strategy Call';

      for (var i = 0; i < attendees.length; i++) {
        var attendee = attendees[i];
        var email = attendee.getEmail().toLowerCase().trim();
        var name = attendee.getName() || '';

        // Search GHL for this email
        var contact = searchGhlContact(apiKey, email);
        var contactId;

        if (contact) {
          contactId = contact.id;
          addTagToContact(apiKey, contactId, CONFIG.TAG_CALL_BOOKED);
          tagged++;
          Logger.log('Tagged existing contact: ' + email + ' (ID: ' + contactId + ')');
        } else {
          var nameParts = parseName(name, email);
          var newContact = createGhlContact(apiKey, nameParts.firstName, nameParts.lastName, email, [CONFIG.TAG_CALL_BOOKED]);
          contactId = newContact && newContact.contact ? newContact.contact.id : null;
          created++;
          Logger.log('Created new contact: ' + email);
        }

        // Write appointment details to the contact
        if (contactId) {
          updateContactCallInfo(apiKey, contactId, eventStart);
          addContactNote(apiKey, contactId, eventTitle, eventStart);
        }

        processed++;
      }

      markEventProcessed(eventId);
    }

    setLastRunTime(now);

    if (processed > 0) {
      Logger.log('Sync complete. Processed: ' + processed + ', Tagged: ' + tagged + ', Created: ' + created);
    }

  } catch (error) {
    Logger.log('ERROR: ' + error.message);
    sendErrorNotification(error);
  }
}


// ============================================================
// GHL API
// ============================================================

function searchGhlContact(apiKey, email, retries) {
  retries = retries || 0;

  var url = CONFIG.GHL_BASE_URL + '/contacts/'
    + '?locationId=' + CONFIG.GHL_LOCATION_ID
    + '&query=' + encodeURIComponent(email)
    + '&limit=5';

  var response = UrlFetchApp.fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Version': CONFIG.GHL_API_VERSION,
    },
    muteHttpExceptions: true,
  });

  var code = response.getResponseCode();

  if (code === 429 && retries < 3) {
    Utilities.sleep(3000 * (retries + 1));
    return searchGhlContact(apiKey, email, retries + 1);
  }
  if (code !== 200) {
    throw new Error('GHL contact search failed (' + code + '): ' + response.getContentText());
  }

  var data = JSON.parse(response.getContentText());
  var contacts = data.contacts || [];

  // Exact email match only
  for (var i = 0; i < contacts.length; i++) {
    if ((contacts[i].email || '').toLowerCase() === email) {
      return contacts[i];
    }
  }

  return null;
}

function addTagToContact(apiKey, contactId, tag, retries) {
  retries = retries || 0;

  var url = CONFIG.GHL_BASE_URL + '/contacts/' + contactId + '/tags';

  var response = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Version': CONFIG.GHL_API_VERSION,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify({ tags: [tag] }),
    muteHttpExceptions: true,
  });

  var code = response.getResponseCode();

  if (code === 429 && retries < 3) {
    Utilities.sleep(3000 * (retries + 1));
    return addTagToContact(apiKey, contactId, tag, retries + 1);
  }
  if (code !== 200 && code !== 201) {
    throw new Error('GHL add tag failed (' + code + '): ' + response.getContentText());
  }
}

function createGhlContact(apiKey, firstName, lastName, email, tags, retries) {
  retries = retries || 0;

  var url = CONFIG.GHL_BASE_URL + '/contacts/';

  var body = {
    locationId: CONFIG.GHL_LOCATION_ID,
    firstName: firstName,
    lastName: lastName,
    email: email,
    tags: tags,
  };

  var response = UrlFetchApp.fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Version': CONFIG.GHL_API_VERSION,
      'Content-Type': 'application/json',
    },
    payload: JSON.stringify(body),
    muteHttpExceptions: true,
  });

  var code = response.getResponseCode();

  if (code === 429 && retries < 3) {
    Utilities.sleep(3000 * (retries + 1));
    return createGhlContact(apiKey, firstName, lastName, email, tags, retries + 1);
  }

  // GHL blocks duplicate contacts and returns 400 with the existing
  // contact's ID in meta.contactId. Reuse that contact instead of failing.
  // (searchGhlContact can miss contacts the create endpoint still matches.)
  if (code === 400) {
    var dupInfo = null;
    try { dupInfo = JSON.parse(response.getContentText()); } catch (e) {}
    if (dupInfo && dupInfo.meta && dupInfo.meta.contactId) {
      Logger.log('Contact already exists (' + email + '), reusing ID: ' + dupInfo.meta.contactId);
      for (var t = 0; t < tags.length; t++) {
        addTagToContact(apiKey, dupInfo.meta.contactId, tags[t]);
      }
      return { contact: { id: dupInfo.meta.contactId } };
    }
  }

  if (code !== 200 && code !== 201) {
    throw new Error('GHL create contact failed (' + code + '): ' + response.getContentText());
  }

  return JSON.parse(response.getContentText());
}


function updateContactCallInfo(apiKey, contactId, appointmentDate) {
  var url = CONFIG.GHL_BASE_URL + '/contacts/' + contactId;

  // Format date for GHL (ISO string)
  var body = {
    customFields: [
      { key: 'contact.call_date', field_value: appointmentDate.toISOString() }
    ]
  };

  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Version': CONFIG.GHL_API_VERSION,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true,
    });

    var code = response.getResponseCode();
    if (code !== 200 && code !== 201) {
      // Non-critical: custom field may not exist yet. Log but don't throw.
      Logger.log('Could not update call date custom field (' + code + '). '
        + 'Create the "Call Date" custom field in GHL if not done yet.');
    }
  } catch (e) {
    Logger.log('Call date update skipped: ' + e.message);
  }
}

function addContactNote(apiKey, contactId, eventTitle, appointmentDate) {
  var url = CONFIG.GHL_BASE_URL + '/contacts/' + contactId + '/notes';

  var callDate = appointmentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Chicago',
  });
  var callTime = appointmentDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'America/Chicago',
  });

  var noteBody = 'Call booked: ' + eventTitle + '\n'
    + 'Date: ' + callDate + '\n'
    + 'Time: ' + callTime + ' CT\n'
    + 'Source: Google Calendar (auto-synced)';

  try {
    var response = UrlFetchApp.fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
        'Version': CONFIG.GHL_API_VERSION,
        'Content-Type': 'application/json',
      },
      payload: JSON.stringify({ body: noteBody }),
      muteHttpExceptions: true,
    });

    var code = response.getResponseCode();
    if (code !== 200 && code !== 201) {
      Logger.log('Could not add contact note (' + code + '): ' + response.getContentText());
    }
  } catch (e) {
    Logger.log('Contact note skipped: ' + e.message);
  }
}


// ============================================================
// Helpers
// ============================================================

function parseName(fullName, email) {
  if (fullName && fullName.trim()) {
    var parts = fullName.trim().split(/\s+/);
    return {
      firstName: parts[0] || '',
      lastName: parts.slice(1).join(' ') || '',
    };
  }
  // Fallback: use the part before @ as first name
  return { firstName: email.split('@')[0], lastName: '' };
}

function getLastRunTime() {
  var stored = PropertiesService.getScriptProperties().getProperty('lastRunTime');
  if (stored) return new Date(stored);
  return new Date(Date.now() - CONFIG.INITIAL_LOOKBACK_HOURS * 60 * 60 * 1000);
}

function setLastRunTime(date) {
  PropertiesService.getScriptProperties().setProperty('lastRunTime', date.toISOString());
}

function isEventProcessed(eventId) {
  var processed = JSON.parse(
    PropertiesService.getScriptProperties().getProperty('processedEvents') || '[]'
  );
  return processed.indexOf(eventId) !== -1;
}

function markEventProcessed(eventId) {
  var props = PropertiesService.getScriptProperties();
  var processed = JSON.parse(props.getProperty('processedEvents') || '[]');
  processed.push(eventId);
  // Keep last 100 to stay within Script Properties 9KB size limit
  if (processed.length > 100) processed = processed.slice(-100);
  props.setProperty('processedEvents', JSON.stringify(processed));
}


// ============================================================
// Error notification
// ============================================================

function sendErrorNotification(error) {
  try {
    MailApp.sendEmail({
      to: CONFIG.ERROR_NOTIFY_EMAIL,
      subject: 'Creekside: Calendar-GHL Sync Error',
      body: 'The Google Calendar to GHL booking sync hit an error.\n\n'
        + 'Error: ' + error.message + '\n\n'
        + 'Time: ' + new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' }) + '\n\n'
        + 'What to check:\n'
        + '1. Is the GHL API key still valid? (regenerate in GHL Settings > Integrations)\n'
        + '2. Is Cade\'s calendar ID correct?\n'
        + '3. Open script.google.com and check Executions for details.\n',
    });
  } catch (mailError) {
    Logger.log('Failed to send error notification: ' + mailError.message);
  }
}


// ============================================================
// One-time setup functions
// ============================================================

/**
 * Run this FIRST. Stores the GHL API key securely in Script Properties
 * (not hardcoded in the source code).
 */
function setApiKey() {
  // Replace the value below with your actual GHL API key, run once, then
  // delete the key from this line.
  var key = 'pit-77946646-08e5-4f95-9df6-b2f801168f0e';

  PropertiesService.getScriptProperties().setProperty('GHL_API_KEY', key);
  Logger.log('API key saved to Script Properties. You can now remove it from the source code.');
}

function getApiKey() {
  var key = PropertiesService.getScriptProperties().getProperty('GHL_API_KEY');
  if (!key) {
    throw new Error('GHL API key not set. Run setApiKey() first.');
  }
  return key;
}

/**
 * Run this SECOND. Creates the 5-minute polling trigger.
 */
function setupTrigger() {
  // Remove existing triggers for this function
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'syncNewBookings') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }

  ScriptApp.newTrigger('syncNewBookings')
    .timeBased()
    .everyMinutes(5)
    .create();

  Logger.log('Trigger created: syncNewBookings runs every 5 minutes.');
}

/**
 * Run this to test manually. Check View > Executions for output.
 */
function testManual() {
  Logger.log('Starting manual sync test...');
  syncNewBookings();
  Logger.log('Test complete. Check logs above for results.');
}

/**
 * Run this to reset the sync state (re-processes all recent events).
 */
function resetSyncState() {
  var props = PropertiesService.getScriptProperties();
  props.deleteProperty('lastRunTime');
  props.deleteProperty('processedEvents');
  Logger.log('Sync state reset. Next run will look back ' + CONFIG.INITIAL_LOOKBACK_HOURS + ' hours.');
}
