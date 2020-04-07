
function tempFToC(temp){
    return (temp - 32)*(5/9);
}

function tempCtoF(temp){
    return (temp * (9/5)) + 32;
}

function tempFtoK(temp){
    return (temp - 32) * (5/9) + 273.15;
}

function tempKtoF(temp){
    return (temp - 273.15) * (9/5) + 32;
}

function tempCtoK(temp){
    return (temp + 273.15);
}

function tempKtoC(temp){
    return (temp - 273.15);
}

module.exports = { tempCtoF, tempCtoK, tempFToC, tempFtoK, tempKtoC, tempKtoF };