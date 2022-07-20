const playerAttakValue = 10;
const monsterAttakValue = 14;
const strongAttakValue = 17;
const maxHealValue = 16;
const normalAttakType = "attak";
const strongAttakType = "strong attak"
const logEventStrongAttak = "player strong attak";
const logEventAttak = "player attak";
const logEventMonsterAttak = "monster attak";
const logEventHeal = "player heal";
const logEventGameOver = "game over!"
function getUserInput() {
    const enterdValue = prompt("choos health amount: ", "100");
    const parsedValue = parseInt(enterdValue);
    if (parsedValue < 1 || isNaN(parsedValue)) {
        throw {message: "error input invalid!"};
    }
    return parsedValue;
}
let chosenMaxLife = 0;
try {
    chosenMaxLife = getUserInput();
} catch (error) {
    alert("input invalid! isNaN, using 100 as defulte value.");
    chosenMaxLife = 100;
}
let battelLog = [];
let currentMonsterHealth = chosenMaxLife;
let currentPlyerHealth = chosenMaxLife; 
let hasBonusLife = true;
function wrightToLog(ev, val, playerHelth, monsterHealth) {
    let logEntry = {
        event: ev,
        value: val,
        finalPlayerHealth: playerHelth,
        finalMonsterHealth: monsterHealth
    }
    switch (ev) {
        case logEventAttak:
            logEntry.target = "monster";
            break;
        case logEventStrongAttak:
            logEntry.target = "monster";
            break;
        case logEventMonsterAttak:
            logEntry.target = "player";
            break;
        case logEventHeal:
            logEntry.target = "player";
            break;
        case logEventGameOver:
            logEntry.target = "player";
            break;
        default:
            logEntry.target = "unknown";
    }
    battelLog.push(logEntry);
}
adjustHealthBars(chosenMaxLife);
function resete() {
    currentMonsterHealth = chosenMaxLife;
    currentPlyerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}
function endTurn() {
    const initialPlayerHealth = currentPlyerHealth;
    const damageToPlayer = dealPlayerDamage(monsterAttakValue);
    currentPlyerHealth -= damageToPlayer;
    wrightToLog(logEventMonsterAttak, damageToPlayer, currentPlyerHealth, currentMonsterHealth);
    if (currentPlyerHealth < 1 && hasBonusLife === true) {
        hasBonusLife = false;
        currentPlyerHealth = initialPlayerHealth;
        removeBonusLife();
        setPlayerHealth(initialPlayerHealth);
        alert("its a mircal!")
    }
    if (currentMonsterHealth < 1 && currentPlyerHealth > 0) {
        wrightToLog(logEventGameOver, "vectory", currentPlyerHealth, currentMonsterHealth);
        alert("vectory!");
        resete();
    } else if (currentPlyerHealth < 1 && currentMonsterHealth > 0) {
        wrightToLog(logEventGameOver, "retreat!", currentPlyerHealth, currentMonsterHealth);
        alert("retreat!");
        resete();
    } else if (currentMonsterHealth < 1 && currentPlyerHealth < 1) {
        wrightToLog(logEventGameOver, "vectory, but it cost us everything.", currentPlyerHealth, currentMonsterHealth);
        alert("vectory, but it cost us everything.")
        resete();
    }
}
function playerAttak(attakMode) {
    let maxDamage = 0;
    let logAttakMode = 0;
    if (attakMode === normalAttakType) {
        maxDamage = playerAttakValue;
        logAttakMode = logEventAttak;
    } else if (attakMode === strongAttakType) {
        maxDamage = strongAttakValue;
        logAttakMode = logEventStrongAttak;
    }
    const damageToMonster = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damageToMonster;
    wrightToLog(logAttakMode, maxDamage, currentPlyerHealth, currentMonsterHealth);
    endTurn();
}
function attakHandler() {
    playerAttak(normalAttakType);
}
function strongAttakHandler() {
    playerAttak(strongAttakType);
}
function healHandler() {
    let healValue;
    if (currentPlyerHealth >= chosenMaxLife - maxHealValue) {
        alert("you cant heal past max life points!");
        healValue = chosenMaxLife - currentPlyerHealth;
    } else {
        healValue = maxHealValue;
    }
    increasePlayerHealth(healValue);
    currentPlyerHealth += healValue;
    wrightToLog(logEventHeal, healValue, currentPlyerHealth, currentMonsterHealth)
    endTurn();
}
function logHandler() {
    for (const logEntry of battelLog) {   //for of loop (good for arryes)
        console.log(logEntry);
    }
}
attackBtn.addEventListener("click", attakHandler);
strongAttackBtn.addEventListener("click", strongAttakHandler);
healBtn.addEventListener("click", healHandler);
logBtn.addEventListener("click", logHandler);