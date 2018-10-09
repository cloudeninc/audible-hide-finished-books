/**
 * Audible Hide Finished Books Extension for Chrome
 * Kenneth Falck <kennu@clouden.net> 2018
 * Copyright Clouden Oy 2018 - See LICENSE.md for license (MIT)
 */

function hideFinishedBooks(hide) {
  var rows = document.getElementsByClassName('bc-table-row')
  if (!rows || rows.length <= 0) return
  for (var rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    var finished = false
    var row = rows.item(rowIndex)
    var cols = row.getElementsByTagName('td')
    if (!cols || cols.length <= 0) continue
    var firstCol = cols.item(0)
    console.log('Considering', firstCol)
    var spans = firstCol.getElementsByTagName('span')
    if (!spans) continue
    for (var spanIndex = 0; spanIndex < spans.length; spanIndex += 1) {
      var span = spans.item(spanIndex)
      if (span.innerText.match(/Finished/)) {
        // This row item is marked finished.
        finished = true
      }
    }
    if (finished) {
      // Hide the row
      row.style.display = hide ? 'none' : ''
    }
  }
}

function toggleFinishedBooks(event) {
  if (event.target.value === 'hide-finished') {
    hideFinishedBooks(true)
  } else {
    hideFinishedBooks(false)
  }
}

function addHideUi() {
  var forms = document.getElementsByClassName('refinementsAndPagingForm')
  if (!forms || !forms.length || !forms.item(0)) {
    console.log('Audible Hide Finished Books is not compatible with the current version of Audible website, sorry!')
  }
  var form = forms.item(0)
  var span = document.createElement('span')
  span.className = 'bc-dropdown bc-dropdown-inline bc-dropdown-small'
  var select = document.createElement('select')
  select.className = 'bc-input bc-color-base bc-color-border-focus bc-color-background-base bc-color-border-base refinemendFormDropDown refinementDropdown-finishedFilter bc-input-inline bc-input-small'
  select.setAttribute('name', 'finishedFilter')
  select.onchange = toggleFinishedBooks
  var option1 = document.createElement('option')
  option1.setAttribute('value', 'hide-finished')
  option1.appendChild(document.createTextNode('Hide Finished Books'))
  var option2 = document.createElement('option')
  option2.setAttribute('value', 'show-finished')
  option2.appendChild(document.createTextNode('Show Finished Books'))
  select.appendChild(option1)
  select.appendChild(option2)
  select.selectedIndex = 0
  var chevron = document.createElement('i')
  chevron.className = 'bc-icon bc-icon-chevron-down'
  chevron.setAttribute('aria-hidden', true)

  span.appendChild(select)
  span.appendChild(chevron)
  form.appendChild(span)

  // Default is to hide
  hideFinishedBooks(true)
}

addHideUi()
