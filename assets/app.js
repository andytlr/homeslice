var cityOptions = {
  "hawaii":        ["Hawaii",        "US/Hawaii"],
  "uspacific":     ["US Pacific",    "US/Pacific"],
  "sanfrancisco":  ["San Francisco", "America/Los_Angeles"],
  "losangeles":    ["Los Angeles",   "America/Los_Angeles"],
  "phoenix":       ["Phoenix",       "America/Phoenix"],
  "chicago":       ["Chicago",       "America/Chicago"],
  "uscentral":     ["US Central",    "US/Central"],
  "austin":        ["Austin",        "US/Central"],
  "useastern":     ["US Eastern",    "US/Eastern"],
  "newyork":       ["New York",      "America/New_York"],
  "toronto":       ["Toronto",       "America/Toronto"],
  "santiago":      ["Santiago",      "America/Santiago"],
  "saopaulo":      ["São Paulo",     "America/Sao_Paulo"],
  "newfoundland":  ["Newfoundland",  "Canada/Newfoundland"],
  "london":        ["London",        "Europe/London"],
  "paris":         ["Paris",         "Europe/Paris"],
  "vienna":        ["Vienna",        "Europe/Vienna"],
  "berlin":        ["Berlin",        "Europe/Berlin"],
  "athens":        ["Athens",        "Europe/Athens"],
  "moscow":        ["Moscow",        "Europe/Moscow"],
  "moscow":        ["Moscow",        "Europe/Moscow"],
  "dubai":         ["Dubai",         "Asia/Dubai"],
  "colombo":       ["Colombo",       "Asia/Colombo"],
  "dhaka":         ["Dhaka",         "Asia/Dhaka"],
  "dhaka":         ["Dhaka",         "Asia/Dhaka"],
  "bangkok":       ["Bangkok",       "Asia/Bangkok"],
  "singapore":     ["Singapore",     "Asia/Singapore"],
  "perth":         ["Perth",         "Australia/Perth"],
  "hongkong":      ["Hong Kong",     "Asia/Hong_Kong"],
  "tokyo":         ["Tokyo",         "Asia/Tokyo"],
  "adelaide":      ["Adelaide",      "Australia/Adelaide"],
  "melbourne":     ["Melbourne",     "Australia/Melbourne"],
  "sydney":        ["Sydney",        "Australia/Sydney"],
  "vladivostok":   ["Vladivostok",   "Asia/Vladivostok"],
  "auckland":      ["Auckland",      "Pacific/Auckland"],
  "samoa":         ["Samoa",         "Pacific/Samoa"]
}

// Setup
var formatCurrentTime    = 'ddd Do MMM, h:mma'
var formatTime           = 'ddd ha'
var formatNewDay         = 'ddd Do MMM, ha'
var formatTimePlusThirty = 'ddd h:[30]a'
var hoursInTheFuture     = 24 * 7

// Find query string, remove trailing slash, split on & and add to array.
var queryString = window.location.search.substring(1).replace(/\//, "");
var queryCities = queryString.split("&");

// Make an empty Object to be added to.
cities = {}

function addCityToUrl(city) {
  queryString += '&' + city;
  window.location.search = queryString;

  return false;
};

function removeCityFromUrl(city) {
  var regex = '&' + city
  queryString = queryString.replace(new RegExp(regex,"g"), "");
  window.location.search = queryString;

  return false;
};

var settingsEl         = document.getElementById("settings");
var settingsButton     = document.getElementById("settingsbutton");

// If settings is in the query string, show settings.
// Otherwise hide them.
if (queryString.indexOf("settings") > -1) {
  settingsEl.classList.remove("is-hidden");
  var closeText = document.createTextNode("✕")
  settingsButton.appendChild(closeText)
} else {
  settingsEl.classList.add("is-hidden");
  var addRemoveText = document.createTextNode("+ / −")
  settingsButton.appendChild(addRemoveText)
}

settingsButton.onclick = function toggleSettingsVisibility() {
  if (queryString.indexOf("settings") > -1) {
    queryString = queryString.replace(/&settings/, "");
    window.location.search = queryString;
  } else {
    queryString += "&settings"
    window.location.search = queryString;
  }
}

for (var city in cityOptions) {

  var cityOptionEl  = document.createElement("div");
  var cityName      = document.createTextNode(cityOptions[city][0]);
  settingsEl.appendChild(cityOptionEl);
  cityOptionEl.appendChild(cityName);
  cityOptionEl.classList.add("addbutton");
  cityOptionEl.id = "add" + city;

  var addButton = document.getElementById('add' + city);

  if (queryString.indexOf(city) > -1) {
    addButton.classList.add("inactive");
    addButton.onclick = removeCityFromUrl.bind(this, city);
  } else {
    addButton.classList.add("active");
    addButton.onclick = addCityToUrl.bind(this, city);
  }
}


// If the query string is empty
if (! queryString) {
  // Add default cities
  window.location.search += '?&settings'
} else {
  // For each city in the options
  for (var city in cityOptions) {
    // If a city exists in the query string.
    if (queryCities.indexOf(city) > -1) {
      // Add it to the cities Object.
      cities[city] = [
        cityOptions[city][0],
        cityOptions[city][1]
      ];
    }
  }
}

// Find elements to add content to.
var citiesEl      = document.getElementById("cities");
var headingsEl    = document.getElementById("headings");

// For each city
for (var city in cities) {

  // Generate markup for each city
  var cityEl        = document.createElement("div");
  var headingEl     = document.createElement("h2");

  // Nice name for city, e.g. 'San Francisco'
  var cityName      = document.createTextNode(cities[city][0]);

  // The name in the URL, e.g. 'sanfrancisco'
  var cityShortName = city;

  // Append generated elements and add classes
  citiesEl.appendChild(cityEl).classList.add("city", cityShortName);
  headingsEl.appendChild(headingEl).classList.add("heading");
  headingEl.appendChild(cityName);

  // Append div.hour with data-hour="cityshortname" X times.
  // Where X is the number of hours in the future.
  // `hoursInTheFuture` is set at the top of this script.
  for (var i = 0; i < hoursInTheFuture; i++) {
    var hourEl     = document.createElement("div");
    cityEl.appendChild(hourEl).classList.add("hour");
    hourEl.setAttribute("data-hour", cityShortName);
  }
}

// This appends the city names to the page title.
var documentTitle = "Homeslice: ";
var cityNumber    = 1

for (var city in cities) {
  var numberOfCities = Object.keys(cities).length

  if (cityNumber < numberOfCities) {
    documentTitle += cities[city][0] + ' & ';
  } else {
    documentTitle += cities[city][0];
  }

  cityNumber += 1

  document.title = documentTitle;
}


// Generate content and regenerate on a timer.
function updateCities(){

  // For each city
  for (var city in cities) {

    // The name in the URL, e.g. 'sanfrancisco'
    var cityShortName = city;

    // Time difference, offset from GMT. e.g. '+1000'
    var tzName        = cities[city][1];

    // Find elements with the matching data attribute.
    // Create an array with all these elements called `hours`
    var hours = document.querySelectorAll('[data-hour=' + cityShortName +']');

    // For every element in `hours` do...
    [].forEach.call(hours, function(hourNode, index) {

      // Set `currentTime` to the correct time with Moment Timezone.
      var currentTime = moment().tz(tzName);

      // Get the GMT offset and remove the : from +09:30
      var timeDiff = moment().tz(tzName).format('Z').replace(/:/, "")

      // If it's the first hour
      if (index === 0) {
        // Set a different time format
        var format = formatCurrentTime;
        // Add the class current
        hourNode.classList.add("current");
      // Otherwise
      } else {
        // Use a default time format.
        var format = formatTime;
        // Add an additional hour to each row based on the number
        // of the item in the array. 6pm + 0 = 6pm, 6pm + 1 = 7pm.
        currentTime = currentTime.add('hours', index);
      }

      // Regex to match if a time difference is plus or minus 30min.
      // E.g. Adelaide is +0930.
      var plusOrMinusThirty    = /(\+|\-)\d{2}3\d{1}/g

      // Negative lookahead of the above regex.
      // So you can say "doesn't match".
      var notPlusOrMinusThirty = /^(?!(\+|\-)\d{2}3\d{1})/g

      // If timezone has a half an hour difference,
      // and it isn't the first item (current time).
      // Set the new time format.
      if (timeDiff.match(plusOrMinusThirty) && index != 0){
        var format = formatTimePlusThirty;
      }

      // If timezone has a half an hour difference,
      // and it's in the first half of the full hour,
      // and it isn't the first item (current time).
      // Subtract an hour and set the new time format.
      if (timeDiff.match(plusOrMinusThirty) && currentTime.format('mm') < 30 && index != 0){
        currentTime = currentTime.subtract('hours', 1);
        var format = formatTimePlusThirty;
      }

      // If timezone doesn't have a half hour difference,
      // And it's midnight,
      // and it isn't the first item (current time).
      // Set the new time format.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 00 && index != 0) {
        var format = formatNewDay;
      }

      // If timezone doesn't have a half hour difference,
      // And it's midnight,
      // Add a class for styling.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 00) {
        hourNode.classList.add("daystart");
      }

      // If timezone doesn't have a half hour difference,
      // And it's midday,
      // and it isn't the first item (current time).
      // Set the new time format.
      if (timeDiff.match(notPlusOrMinusThirty) && currentTime.format('HH') == 12 && index != 0) {
        var format = 'ddd [Midday]';
      }

      if (currentTime.format('ha') == "12am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "1am") {
        hourNode.classList.add("sleep");
        hourNode.classList.remove("daystart");
      }

      if (currentTime.format('ha') == "2am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "3am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "4am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "5am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "6am") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('ha') == "7am") {
        hourNode.classList.add("outsidebusiness");
        hourNode.classList.remove("sleep");
      }

      if (currentTime.format('ha') == "8am") {
        hourNode.classList.add("outsidebusiness");
      }

      if (currentTime.format('ha') == "9am") {
        hourNode.classList.remove("outsidebusiness");
      }

      if (currentTime.format('ha') == "6pm") {
        hourNode.classList.add("outsidebusiness");
      }

      if (currentTime.format('ha') == "7pm") {
        hourNode.classList.add("outsidebusiness");
      }

      if (currentTime.format('ha') == "8pm") {
        hourNode.classList.add("outsidebusiness");
      }

      if (currentTime.format('ha') == "9pm") {
        hourNode.classList.add("outsidebusiness");
      }

      if (currentTime.format('ha') == "10pm") {
        hourNode.classList.add("sleep");
        hourNode.classList.remove("outsidebusiness");
        hourNode.classList.remove("evening");
      }

      if (currentTime.format('ha') == "11pm") {
        hourNode.classList.add("sleep");
      }

      if (currentTime.format('HH') >= 18 && currentTime.format('HH') < 22) {
        hourNode.classList.add("evening");
      }

      if (currentTime.format('ddd') == "Sat") {
        hourNode.classList.add("weekend");
      }

      if (currentTime.format('ddd') == "Sun") {
        hourNode.classList.add("weekend");
      }

      if (currentTime.format('ddd') == "Mon") {
        hourNode.classList.remove("weekend");
      }

      // Actually add the time to the document.
      hourNode.innerHTML = currentTime.format(format);

    });
  }
};

// Run the update cities function.
updateCities();

// Then re-run it every second.
setInterval(updateCities, 1000);
