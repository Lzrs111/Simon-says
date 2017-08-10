export default function rgbToHex(array) {
     var hex = "";
     for (var i = 0; i < array.length; i++) {
            if (parseInt(array[i],10) == 0){
                hex+="0"
            } 
        hex+=parseInt(array[i],10).toString(16)

     }
    return hex
}    