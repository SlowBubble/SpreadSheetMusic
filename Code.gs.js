/**
 * @OnlyCurrentDoc
 *
 * The above comment directs Apps Script to limit the scope of file
 * access for this add-on. It specifies that this add-on will only
 * attempt to read or modify the files in which the add-on is used,
 * and not all of the user's files. The authorization request message
 * presented to users will reflect this limited scope.
 */

/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Start', 'showSidebar')
      .addToUi();
}

/**
 * Runs when the add-on is installed.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE.)
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Opens a sidebar in the document containing the add-on's user interface.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 */
function showSidebar() {
  var ui = HtmlService.createHtmlOutputFromFile('Sidebar')
      .setTitle('Spread Sheet Music');
  SpreadsheetApp.getUi().showSidebar(ui);
}

function getSheetMusicJson() {
  var music = {}
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastColumn = sheet.getLastColumn();
  var lastRow = sheet.getLastRow();
  var keysAndRows = []
  var rows = sheet.getRange(1, 1, lastRow, lastColumn).getValues();
  var currVal = null;
  for (var i=0; i < rows.length; i++) {
    var row = rows[i];
    var key = row[0];
    if (key !== '') {
      currVal = [];
      music[key] = currVal;
    }
    if (currVal !== null) {
      currVal.push.apply(currVal, parse(row))
    }
  }

  return music;
}

function parse(row) {
  for (var i = row.length - 1; i >= 1; i--) {
    if (row[i] !== '') {
      return row.slice(1, i + 1);
    }
  }
  return [];
}
