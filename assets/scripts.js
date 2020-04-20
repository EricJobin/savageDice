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
    let wDieCheck=0;
    let sCheckTotal=0;

    let sDieCheck=rollCheck(sDie, sDieTotal)
    console.log(`Skill Die Total: ${sDieCheck}`);

    //if($("#wildDieCheck").is(':checked')){console.log(true)}else{console.log(false)}
    if($("#wildDieCheck").is(':checked')){
        console.log("Wild Die Rolled")
        wDieCheck=rollCheck(wDie, wDieTotal)
        console.log(`Wild Die Total: ${wDieCheck}`);
    };

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

    //This function will listen for skill roll checks and show results
    $("#rollSkill").click(function(){
        $("#resultOutput").empty();
        let checkRes= rollSkillCheck($("#skillDie").val(), $("#wildDie").val());
        let fTotal= checkRes + parseInt($("#bonus").val()) - parseInt($("#penalty").val());
        let stuff= ['Skill Check Value: ', checkRes, 'Bonus: ', $("#bonus").val(), 'Penalty: ', $("#penalty").val(), 'Final Total: ',fTotal];
        console.log(stuff)
        $("#resultOutput").append(fTotal)
        let goodStuff = checkSuccess(fTotal, parseInt($("#difficulty").val()));
        $("#resultOutput").append(`<br>${goodStuff[0]}`)
        if (goodStuff[1] > 0){$("#resultOutput").append(` With ${goodStuff[1]} Raise`)};
        if (goodStuff[1] > 1){$("#resultOutput").append(`s`)};
    });

    //This function rolls for damage, should be re-written reduce code repetition
    $("#rollDamage").click(function(){

        $("#damageResultOutput").empty();
        let damageTotal = 0;

        if($("#d4roll").is(':checked')){
            for (i=0; i< $("#d4qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(4, thisroll)
            }
        };
        if($("#d6roll").is(':checked')){
            for (i=0; i< $("#d6qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(6, thisroll)
            }
        };
        if($("#d8roll").is(':checked')){
            for (i=0; i< $("#d8qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(8, thisroll)
            }
        };
        if($("#d10roll").is(':checked')){
            for (i=0; i< $("#d10qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(10, thisroll)
            }
        };
        if($("#d12roll").is(':checked')){
            for (i=0; i< $("#d12qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(12, thisroll)
            }
        };
        if($("#d20roll").is(':checked')){
            for (i=0; i< $("#d20qty").val() ;i++){
                let thisroll=0
                damageTotal = damageTotal + rollCheck(20, thisroll)
            }
        };

        let finalDamage = damageTotal + parseInt($("#damageBonus").val()) - parseInt($("#damagePenalty").val());
        $("#damageResultOutput").append(finalDamage);

        let goodStuff = checkSuccess(finalDamage, parseInt($("#toughness").val()));
        $("#damageResultOutput").append(`<br>${goodStuff[0]}`)
        if (goodStuff[1] > 0){$("#damageResultOutput").append(` With ${goodStuff[1]} Raise`)};
        if (goodStuff[1] > 1){$("#damageResultOutput").append(`s`)};
    })
  
}); 