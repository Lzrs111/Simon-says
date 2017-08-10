import rgbToHex from "./rgbtohex.js"

var rgbHex = rgbToHex //calling the function directly raises an error
var colors = {
        "999900": "#FFFF32",
        "004600": "#66FF00",
        "8b0000": "#FF0000",
        "1e3c72":  "#2a52CC" 
    }
var sounds = {
        "999900": "./SimonSound1.mp3",
        "004600": "./SimonSound2.mp3",
        "8b0000": "./SimonSound3.mp3",
        "1e3c72": "./SimonSound4.mp3"
    }

export default function animationFunction(element) {
    var color = window.getComputedStyle(element, null).getPropertyValue("background-color").match(/\d{1,3}/g)
    color = rgbHex(color)
    element.style.backgroundColor = colors[color]
    var audio = new Audio(sounds[color])
    console.log(audio)
    audio.play()
    setTimeout(function() {
        element.style.backgroundColor = "#" + color
    }, 800);
}