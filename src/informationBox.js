import React from "react"



export default function InformationBox() {
    var colors = ["#999900","#004600","#8b0000","#1e3c72"]
    return (
        <div className = 'infoBoxMain'>
          <div>
              {
                  colors.map((value,index)=>{
                    console.log(value)
                    return (
                         <div>
                             <div  className = 'color' style={{backgroundColor:value}}>
                             </div>
                             <p style={{display:"inline-block"}}>
                              Keyboard: {index+1}   
                             </p>
                         </div>
                     )
                     })
              }
          </div>  
        </div>
    )    
}