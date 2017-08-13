import rgbToHex from "./rgbtohex.js"

var rgbHex = rgbToHex //calling the function directly raises an error
var colors = {
        "999900": "#FFFF32",
        "004600": "#66FF00",
        "8b0000": "#FF0000",
        "1e3c72":  "#2a52CC" 
    }
var sounds = {
        "999900": 329.63, 
        "004600": 261.63,
        "8b0000": 220, 
        "1e3c72": 164.81 
        }

var audioCont = new AudioContext();


export function createOscillator(frequency) {
    var oscillator = audioCont.createOscillator()
    oscillator.type = "square"
    oscillator.frequency.value = frequency 
    oscillator.connect(audioCont.destination)
    return oscillator
}


export function animationFunction(element) {
    var color = window.getComputedStyle(element, null).getPropertyValue("background-color").match(/\d{1,3}/g)
    color = rgbHex(color)
    element.style.backgroundColor = colors[color]
    var oscillator = createOscillator(sounds[color])
    oscillator.start()
    setTimeout(function() {
        element.style.backgroundColor = "#" + color
        oscillator.stop(0)
    }, 800);
}