import React from "react"



export default function ControlPanel(props) {
    return(
        <div className = "round">
        <div className = "screenAndButtons" >
          <div className = "screen">
            <p style={props.strict ? {visibility:'visible'} : {visibility:'hidden'}}  className = 'strictMode'>
             S
            </p>
            <p className = 'screenText'>
              {props.status}
            </p>            
          </div>
          <div className = "controlButtons">
          <button onClick = {props.start} disabled={props.started ? true:false} className = "controlButton">
            {"Start"} 
          </button>
          <button  onClick ={props.stop} disabled={props.started ? false:true} className = "controlButton">
            Stop
          </button>
          <button  onClick = {props.strictSwitch} className = "controlButton">
            strict
          </button>
          </div>
        </div>
        </div>

    )    
}