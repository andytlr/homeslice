var cityOptions = {
  "hawaii":        ["Hawaii",        "US/Hawaii"],
  "uspacific":     ["US Pacific",    "US/Pacific"],
  "sanfrancisco":  ["San Francisco", "America/Los_Angeles"],
  "losangeles":    ["Los Angeles",   "America/Los_Angeles"],
  "denver":        ["Denver",        "America/Denver"],
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
  "dubai":         ["Dubai",         "Asia/Dubai"],
  "colombo":       ["Colombo",       "Asia/Colombo"],
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

// Make an empty Object to be added to.
cities = {}

// Setup
var defaultCities         = "melbourne,sanfrancisco,"
var formatCurrentTime     = 'ddd Do MMM, h:mma'
var formatTime            = 'ddd ha'
var formatNewDay          = 'ddd Do MMM, ha'
var formatTimePlusThirty  = 'ddd h:[30]a'
var formatTimeForList     = ' h:mma'
var hoursInTheFuture      = 24 * 7
var settingsEl            = document.getElementById("settings");
var settingsButtonEl      = document.getElementById("settingsbutton");
var settingsButtonContent = document.createTextNode("+ / −");
var citiesEl              = document.getElementById("cities");
var headingsEl            = document.getElementById("headings");
var cookieString          = getCookie("cities");
var creditEl              = document.createElement("div");
                            creditEl.setAttribute("class", "credit");
var creditCopy            = "<p>Homeslice is a project by <a href=\"http://andytaylor.me/\">Andy&nbsp;Taylor</a>.</p> <p>If you find it useful (I hope you do), why not <a href=\"http://twitter.com/home?status=Homeslice: Find time across timezones. http://homeslice.in\">Tweet about it</a> or <a href=\"https://www.facebook.com/sharer/sharer.php?u=http://homeslice.in\">post it on&nbsp;Facebook</a>.</p> <p>Please submit bugs and requests on <a href=\"https://github.com/andytlr/homeslice/issues/\">GitHub</a>.</p> <p>Timezone conversion is done with&nbsp;<a href=\"http://momentjs.com\">Moment.js</a>.</p>"

function areCookiesEnabled() {
  var cookieEnabled = (navigator.cookieEnabled) ? true : false;

  if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
    document.cookie="testcookie";
    cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false;
  }
  return (cookieEnabled);
}

if (areCookiesEnabled() == false) {
  alert("Homeslice uses cookies to remember which cities you compare. Please turn on cookies if you want it to work.")
}

// Functions to work with cookies
function setCookie(c_name,value,exdays) {
  var exdate=new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var c_value=escape(value) + ((exdays==null) ? "" : ("; expires="+exdate.toUTCString()));
  document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name) {
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0;i<ARRcookies.length;i++) {
    x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
    y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
    x=x.replace(/^\s+|\s+$/g,"");
    if (x==c_name) {
     return unescape(y);
    }
  }
}

function showSettings() {
  settingsEl.classList.remove("is-hidden");
  citiesEl.classList.add("is-hidden");
  window.scrollTo(0, 0);
}

function hideSettings() {
  settingsEl.classList.add("is-hidden");
  citiesEl.classList.remove("is-hidden");
  window.scrollTo(0, 0);
}

hideSettings();

if (! cookieString) {
  var cookieString = defaultCities
  setCookie("cities", cookieString, 365)
}

var cookieCities = getCookie("cities").split(",");

function removeCityFromCookie(city) {
  var addButton = document.getElementById('add' + city);

  if (addButton.classList.contains('is-active')) {
    addButton.classList.remove('is-active');

    var regex = city + ",";
    cookieString = cookieString.replace(new RegExp(regex,"g"), "");
    setCookie("cities", cookieString, 365);
    var cookieCities = getCookie("cities").split(",");
    // console.log("Cookie String: " + cookieString);
    // console.log("Cookie Array: " + cookieCities);
  } else {
    addCityToCookie(city)
  }
};

function addCityToCookie(city) {
  var addButton = document.getElementById('add' + city);

  if (addButton.classList.contains('is-active')) {
    removeCityFromCookie(city)
  } else {
    addButton.classList.add('is-active');

    cookieString += city + ",";
    setCookie("cities", cookieString, 365);
    var cookieCities = getCookie("cities").split(",");
    // console.log("Cookie String: " + cookieString);
    // console.log("Cookie Array: " + cookieCities);
  }
};

settingsButtonEl.onclick = function showSettingsScreen() {
  showSettings();
}

var saveButton              = document.createElement("div");
var saveButtonCopy          = document.createTextNode("↫ Done");

settingsButtonEl.appendChild(settingsButtonContent);
settingsEl.appendChild(saveButton);
saveButton.appendChild(saveButtonCopy);
saveButton.classList.add("savebutton");

saveButton.onclick = function closeSettingsScreen() {
  // hideSettings();
  window.location = "/";
}

for (var city in cityOptions) {

  var cityOptionEl            = document.createElement("div");
  var cityName                = document.createTextNode(cityOptions[city][0]);
  var cityOptionCurrentTimeEl = document.createElement("span");
  var currentTime             = document.createTextNode(moment().tz(cityOptions[city][1]).format(formatTimeForList));

  settingsEl.appendChild(cityOptionEl);
  cityOptionEl.appendChild(cityName);
  cityOptionEl.appendChild(cityOptionCurrentTimeEl);
  cityOptionCurrentTimeEl.appendChild(currentTime);
  cityOptionEl.classList.add("addbutton");
  cityOptionEl.id = "add" + city;

  var addButton = document.getElementById('add' + city);

  if (cookieCities.indexOf(city) > -1) {
    addButton.onclick = removeCityFromCookie.bind(this, city);
    addButton.classList.add("is-active");
    cities[city] = [
      cityOptions[city][0],
      cityOptions[city][1]
    ];
  } else {
    addButton.onclick = addCityToCookie.bind(this, city);
    addButton.classList.remove("is-active");
  }
}

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
        // This adds a data-time attribute to each hour.
        // Not super useful yet but might be for sharing later.
        hourNode.setAttribute("data-date-and-time", cities[city][0] + ": " + currentTime.format('dddd Mo MMM, ha.'));
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

settingsEl.appendChild(creditEl);
creditEl.innerHTML = creditCopy;
