//JavaScript for SavageWorlds Dice Rolls

rollDie = (dieVal) => {
    return (Math.floor(Math.random() * dieVal) + 1)
};

rollCheck = (dVal, checkTotal) =>{
    let roll = rollDie(dVal);
    if (roll == dVal){
        checkTotal= checkTotal + roll;
        console.log(`${roll} + explode!`)
        return rollCheck(dVal, checkTotal)
    }
    else {
        checkTotal= checkTotal + roll;
        console.log(`${roll} + noBoom`)
        return checkTotal;
    }
};

rollSkillCheck = (skillDie, wildDie) => {
    let sDie=skillDie;
    let wDie=wildDie;
    let sDieTotal=0;
    let wDieTotal=0;
    let sCheckTotal=0;

    let sDieCheck=rollCheck(sDie, sDieTotal)
    console.log(`Skill Die Total: ${sDieCheck}`);
    let wDieCheck=rollCheck(wDie, wDieTotal)
    console.log(`Wild Die Total: ${wDieCheck}`);

    if (sDieCheck >= wDieCheck){sCheckTotal=sDieCheck}
    else {sCheckTotal=wDieCheck};

    return sCheckTotal;
};

checkSuccess = (rollTotal, checkDifficulty) =>{
    if(rollTotal >= checkDifficulty){
        //Return Good Stuff
        let raises= Math.trunc( (rollTotal-checkDifficulty)/4 );
        return ["Success!", raises];
    }
    else{return ["Fail", 0]}
};

$(document).ready(function(){

    $("#rollSkill").click(function(){
        $("#resultOutput").empty();
        let checkRes= rollSkillCheck($("#skillDie").val(), $("#wildDie").val());
        let fTotal= checkRes + parseInt($("#bonus").val()) - parseInt($("#penalty").val());
        let stuff= ['Skill Check Value: ', checkRes, 'Bonus: ', $("#bonus").val(), 'Penalty: ',   $("#penalty").val(), 'Final Total: ',fTotal];
        console.log(stuff)
        $("#resultOutput").append(fTotal)
        let goodStuff = checkSuccess(fTotal, parseInt($("#difficulty").val()));
        $("#resultOutput").append(`<br>${goodStuff[0]}`)
        if (goodStuff[1] > 0){$("#resultOutput").append(` With ${goodStuff[1]} Raise`)};
        if (goodStuff[1] > 1){$("#resultOutput").append(`s`)};
    });
  
}); 