import rgbToHex from "./rgbtohex.js"
import SimonSound1 from "./simonSound1.mp3"
import SimonSound2 from "./simonSound2.mp3"
import SimonSound3 from "./simonSound3.mp3"
import SimonSound4 from "./simonSound4.mp3"

var rgbHex = rgbToHex //calling the function directly raises an error
var colors = {
        "999900": "#FFFF32",
        "004600": "#66FF00",
        "8b0000": "#FF0000",
        "1e3c72":  "#2a52CC" 
    }
var sounds = {
        "999900": SimonSound1, 
        "004600": SimonSound2,
        "8b0000": SimonSound3, 
        "1e3c72": SimonSound4
        }

export default function animationFunction(element) {
    var color = window.getComputedStyle(element, null).getPropertyValue("background-color").match(/\d{1,3}/g)
    color = rgbHex(color)
    element.style.backgroundColor = colors[color]
    var audio = new Audio(sounds[color])
    audio.play()
    setTimeout(function() {
        element.style.backgroundColor = "#" + color
    }, 800);
}