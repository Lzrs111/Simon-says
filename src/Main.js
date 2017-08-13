import React from "react"
import App from "./App.js"
import InformationBox from "./informationBox.js"


export default function Main() {
    return (
        <div  className = 'main'>
            <div>
            <App/>
            <InformationBox/>
            </div>
        </div>
    )    

}