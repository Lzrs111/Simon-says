//TODO update stopMethod
//various css things


import React from "react"
import "./App.css"
import {animationFunction,createOscillator} from "./animation stuff.js"
import ControlPanel from "./ControlPanel.js"

var interval; //interval for animation; defined as a global var since it's used in various methods
var oscillator; //oscillator for user inputs; defined as a global var since it's used in various methods

export default class Simon extends React.Component {
  constructor(){
    super()
    this.state = {
      strictMode:false, //strict mode
      userInput:false, //input
      numbersToPlay:[], //array of numbers which need to be played
      currentIndex: 0, 
      started: false,
      status:"Press start to play",
      counter:3,
      }

    //bind methods to component
    this.generateNumber = this.generateNumber.bind(this)
    this.startMethod = this.startMethod.bind(this)
    this.animationMethod = this.animationMethod.bind(this)
    this.updateMethod = this.updateMethod.bind(this)
    this.inputSwitch = this.inputSwitch.bind(this)
    this.strictSwitch = this.strictSwitch.bind(this)
    this.stopMethod = this.stopMethod.bind(this)
    this.eventFunction = this.eventFunction.bind(this)
    this.stopAudio = this.stopAudio.bind(this)
    this.startAudio = this.startAudio.bind(this)
  }


  //  generate a random number between zero and three
  generateNumber() {
      return Math.floor(Math.random()*4)
  }
  

  //add keyboard functionality and mouseUp events to buttons
  componentDidMount() {
    document.addEventListener("keydown",this.eventFunction)
    document.addEventListener("keyup",this.eventFunction)

    var references = [this.buttonZero,this.buttonOne,this.buttonTwo,this.buttonThree] //added events here to avoid clutter 
    for (var i = 0; i < references.length; i++) {
      references[i].addEventListener("mouseup",this.stopAudio)
    }
  }

  eventFunction(event) {
    var buttonCodes = {
      "49": "0",
      "50": "1",
      "51": "2",
      "52": "3"
    }
    var keyCheck = "test" //allow the user to hold down the key since the keydown event fires continously
  
    if (buttonCodes.hasOwnProperty(event.keyCode) && event.type=="keydown" && keyCheck==="test"){
      keyCheck = false
      console.log(keyCheck)
      this.inputMethod(parseInt(buttonCodes[event.keyCode]))
    } else if (buttonCodes.hasOwnProperty(event.keyCode) && event.type == "keyup") {
      this.stopAudio()
      keyCheck = false
    }
  }
  //audio methods
  startAudio(index) {
    var sounds = [329.63, 261.63,220,164.81,110]
    
    oscillator = createOscillator(sounds[index])
    oscillator.start()
  }

  stopAudio() {
    oscillator.stop(0)
    oscillator = ""

    if (this.state.currentIndex ==  this.state.numbersToPlay.length && oscillator ==""){ 
            this.updateMethod()
          }  
  }
  

   //   method which executes in starting new game
  startMethod() {
    var temporary = this.state.numbersToPlay

    //generate an array of three numbers  
     for (var index = 0; index < 3 ; index++) {
      temporary.push(this.generateNumber())
    }
    
    //change states and call animation method when done
    this.setState({
      numbersToPlay:temporary,
      started: true ,
      status:this.state.currentIndex + "/" + this.state.counter,
    },()=>{
      console.log(this.state.numbersToPlay)
      this.animationMethod()})
  }


  //stop the current game
  stopMethod() {
  clearInterval(interval)
   this.setState({
     numbersToPlay:[],
     started:false,
     userInput: false,
     currentIndex: 0 ,
     status:"Press start to play",
     counter:3
   }) 
  }


  // allow user input or disable it
  inputSwitch() {
    this.setState({
      userInput:!this.state.userInput
    })
  }


  // strict mode on off
  strictSwitch() {
    this.setState({
      strictMode:!this.state.strictMode
    },console.log(this.state.strictMode))
  }


 //self explanatory
  animationMethod() {
    var references = [this.buttonZero,this.buttonOne,this.buttonTwo,this.buttonThree]
    let temporary = this.state.numbersToPlay
    var count = 0
    
    
    interval = setInterval(()=>{
       console.log(references[temporary[count]])
        animationFunction(references[temporary[count]])
        count++  

         if (count == temporary.length){
            this.inputSwitch()
            clearInterval(interval)
            this.setState({
             status:this.state.currentIndex + "/" + this.state.counter
            })
          }
    },1000)
    }
    
  

  //after correct number sequence, add new number to array of numbers that need to be played
  updateMethod() {
    var temporary = this.state.numbersToPlay
    temporary.push(this.generateNumber())

    //set state accordingly, calls animation method when done
    this.setState({
      counter:this.state.counter+1,
      userInput: false,
      numbersToPlay:temporary,
      currentIndex: 0
    },()=>{
      this.setState({
       status:this.state.currentIndex + "/" + this.state.counter
      })
      this.animationMethod()
      })
  }



 //check if user input is correct
  inputMethod(number) {
    var temporary = this.state.numbersToPlay
    var references = [this.buttonZero,this.buttonOne,this.buttonTwo,this.buttonThree]
    

    if (number == temporary[this.state.currentIndex]){ //if correct number is played
      this.startAudio(number)
      this.setState({
        currentIndex:this.state.currentIndex+1,
      },
        ()=>{
          this.setState({
           status:this.state.currentIndex + "/" + this.state.counter
          })
      })

    } else { //if incorrect
        
        if (this.state.strictMode === true){ //if strict mode
          clearInterval(interval)
          this.setState({
            currentIndex:0,
            numbersToPlay:[],
            status:'Strict mode on, starting new game',
            userInput:false,
            counter:3
          },()=>{
            setTimeout(this.startMethod,1000)
          })
      } 

        else { //if normal mode
          this.startAudio(4)

          this.setState({
            currentIndex:0,
            status: "Incorrect, try again",
            userInput:false
          },()=>{
            setTimeout(() => {
              this.stopAudio()
              this.animationMethod()
            }, 1000);
          })
        }
      }
    }


 //render function
  render() {
    return(
      <div className = "mainWrap">
       <ControlPanel start={this.startMethod} stop={this.stopMethod} started={this.state.started} strict={this.state.strictMode} status={this.state.status} strictSwitch={this.strictSwitch}/> 
        <div className="buttonWrap">
          <div className="simonRow">
            <button className="simonButton"  onMouseDown = {()=>{this.inputMethod(0)}} ref={(number)=>{
              this.buttonZero = number}} disabled={!this.state.userInput} style={{backgroundColor: "#999900",borderTop:"none",borderLeft:"none"}}>
            </button> 

            <button className="simonButton"  onMouseDown = {()=>{
              this.inputMethod(1)}} ref={(number)=>{
              this.buttonOne = number}} disabled={!this.state.userInput} style={{backgroundColor: "#004600",borderTop:"none",borderRight:"none"}}>
            </button>
          </div> 

          <div className="simonRow">
            <button className="simonButton"  onMouseDown = {()=>{this.inputMethod(2)}} ref={(number)=>{
              this.buttonTwo = number}} disabled={!this.state.userInput} style={{backgroundColor: "#8b0000",borderLeft:"none", borderBottom:"none"}}>
            </button> 

            <button className="simonButton"  onMouseDown = {()=>{this.inputMethod(3)}} ref={(number)=>{
              this.buttonThree = number}} disabled={!this.state.userInput} style={{backgroundColor: "#1e3c72", borderRight:'none'}}>
            </button> 
          </div>  
        </div>
      </div>
      
    )
    }
}
