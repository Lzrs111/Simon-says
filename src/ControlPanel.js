import React from "react"



export default function ControlPanel(props) {
    return(
        <div className = "round">
        <div className = "screenAndButtons" >
          <div className = "screen">
            {props.status}
          </div>
          <div className = "controlButtons">
          <button onClick = {props.start} disabled={props.started ? true:false} className = "controlButton">
            {"Start"} 
          </button>
          <button  onClick ={props.stop} disabled={props.started ? false:true} className = "controlButton">
            Stop
          </button>
          <button  onClick = {()=>{
            props.strict}} className = "controlButton">
            strict
          </button>
          </div>
        </div>
        </div>

    )    
}