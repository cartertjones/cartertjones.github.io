
//get root (where color variables are located)
var r = document.querySelector(':root');
const colors = {
  "colors":[
    {"primary": "#087c8e", "secondary": "#13191a", "text": "#dfeff1", "highlight": "#38b7cb"}, //dark
    {"primary": "#087c8e", "secondary": "#ffffff", "text": "#000000", "highlight": "#38b7cb"}  //light
  ]
}

let darkMode = true;
let i = 0;
const toggleDarkMode = (array = []) => {
  darkMode = !darkMode;
  i = darkMode ? 1 : 0;
  
  var rs = getComputedStyle(r);
  // Alert the value of the --blue variable
  console.log("The value of --secondary is: " + rs.getPropertyValue('--secondary'));
  console.log(i);

  r.style.setProperty('--primary', colors.colors[i].primary);
  r.style.setProperty('--secondary', colors.colors[i].secondary);
  r.style.setProperty('--text', colors.colors[i].text);
  r.style.setProperty('--highlight', colors.colors[i].highlight);

  console.log("DarkMode: " + darkMode);

  var buttonIcon = document.getElementById("darkmodeButtonIcon");
  if (buttonIcon.className === "fa fa-toggle-on") {
    buttonIcon.className = "fa fa-toggle-off";
  } else {
    buttonIcon.className = "fa fa-toggle-on";
  }
}

var darkmodeButton = document.getElementById("darkmodeButton");
darkmodeButton.addEventListener("click", toggleDarkMode);