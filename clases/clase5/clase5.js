const moment = require("moment/moment");

let ahora = moment();

//let fechaNac = moment("16-12-1996","DD-MM-YYYY");
let fechaNac = moment("");

if(!fechaNac.isValid()){
    console.log("Fecha no ingresada");
}else{
    let diferenciaDias = ahora.diff(fechaNac,'days');
    console.log(`La diferencia en dias es de: ${diferenciaDias}`); 
};


