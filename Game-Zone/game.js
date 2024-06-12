
//LeaderBoard
function getAllLocalStorageData(excludeKeys = []) {
    let localStorageData = {};
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!excludeKeys.includes(key)) {
            localStorageData[key] = localStorage.getItem(key);
        }
    }
    return localStorageData;
}

let excludedKeys = ['Player1','Player2', 'Board', 'Level'];
let data = getAllLocalStorageData(excludedKeys);


const playersScoresArray = Object.entries(data).map(([player, score]) => {
    return { player: player, score: parseInt(score) };
});

// Sort the array of objects by scores in descending order
playersScoresArray.sort((a, b) => b.score - a.score);


    const playerNames = document.querySelectorAll(".UserName");
    const playerScores = document.querySelectorAll(".score");
for(let i = 0;  i < playersScoresArray.length; i++){
        if(playerNames[i]) {  
            playerNames[i].innerText = `${playersScoresArray[i].player}`;
            playerScores[i].innerText = `${playersScoresArray[i].score}`;
        }
}


//When Data Delete From Data Base So auto update Default Data :)
const autoUpdBtn = document.getElementById("submit")
function isObjEmpty(obj){
    return Object.values(obj).length === 0 && obj.constructor === Object;
}
if(isObjEmpty(data)) {
    setTimeout(() => {
        console.log("Auto Update")
        autoUpdBtn.click();
    }, 1000) 
}

// Setting
const subBut = document.getElementById("submit")
const plr1 = document.getElementById("player1")
const plr2 = document.getElementById("player2")
const gmode = document.getElementById("mode")
const level = document.getElementById("level")




subBut.addEventListener("click", () => {
    const settings = {
        Player1: plr1.value,
        Player2: plr2.value,
        Level: level.value,
        Board: gmode.value,
    }

    for(const [key, value] of Object.entries(settings)){
        localStorage.setItem(key, value)
    }
    let ScoreA = localStorage.getItem('Player1');
    let ScoreB = localStorage.getItem('Player2');
    localStorage.setItem(`${ScoreA}` , 0);
    localStorage.setItem(`${ScoreB}` , 0);
})


    



//Rest Score 



//Load And Apply Settings
const PlayerA = document.getElementById("Player-A")
const PlayerB = document.getElementById("Player-B")

const User1 = localStorage.getItem('Player1')
const User2 = localStorage.getItem('Player2')

PlayerA.innerText = User1
PlayerB.innerText = User2

const humnPng = document.getElementById("humn-png")
const comPng = document.getElementById("com-png")
if(User2 === "Computer"){
    comPng.classList.remove("hidden")
    humnPng.classList.add("hidden")
}else{
    humnPng.classList.remove("hidden")
}

//Score System
let scoreBoxA = document.getElementById("ScoreA")
let scoreBoxB = document.getElementById("ScoreB")
scoreBoxA.innerText = localStorage.getItem(`${User1}`)
scoreBoxB.innerText = localStorage.getItem(`${User2}`)


//Check Board 3x3 or 4x4 of 5x5
const board = localStorage.getItem('Board')


let gameB = document.querySelector(`.game-bordx${board}`)
gameB.classList.remove("hidden")


let boxes = gameB.querySelectorAll(".box")
let rstBtn = document.querySelector("#rst-btn")


const clickSound = document.getElementById('clickSound');
const winnerSound = document.getElementById('winnerSound');

let congMsgX = document.querySelector("#msg-x")
let congMsgO = document.querySelector("#msg-o")
let winnerConX = document.querySelector(".winner-container-X")
let winnerConO = document.querySelector(".winner-container-O")

let rstMsg = document.querySelector(".rstMsg")
let rstMssg = document.querySelector("#msg-m")
let tieMsg = document.querySelector(".tieMsg")
let tieMssg = document.querySelector("#msg-t")
let newGameBtn = document.querySelector("#newGame-btn")

let turnConX = document.querySelector(".turn-x")
let trunConO = document.querySelector(".turn-o")

let turnMsgX = document.querySelector("#turn-x")
let trunMsgO = document.querySelector("#turn-o")

var playerA = true;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
const winPatternsQ = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [0,4,8,12],
    [1,5,9,13],
    [2,6,10,14],
    [3,7,11,15],
    [0,5,10,15],
    [3,6,9,12],
];


const winPatternsR = [
    [0,1,2,3,4],
    [5,6,7,8,9],
    [10,11,12,13,14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
    [0,6,12,18,24],
    [4,8,12,16,20],
];

const restBtn = () => {
    if(playerA){
        trunConO.classList.add("hidden");
        turnConX.classList.remove("hidden");
        turnMsgX.innerText = "X Turn";
    }
    else{
        playerA = true;
        trunConO.classList.add("hidden");
        turnConX.classList.remove("hidden");
        turnMsgX.innerText = "X Turn";
    }
    enableBtns();
}


const showRestMsg = () =>{
    rstMssg.innerText = `Resetting in 5 seconds...`;
    newGameBtn.disabled = true;
    rstMsg.classList.remove("hidden");
    disabledBtns();
    setTimeout(() => {
        rstBtn.click();
    }, 5000);

    setTimeout(() => {
        rstMsg.classList.add("hidden");
        newGameBtn.disabled = false;
    }, 6000);
}


//Bot For Auto Play
const pla = localStorage.getItem('Player2');

const fillValue = () => {
    let workDone = false;
    const randomNumber = Math.floor(Math.random() * `${board * board}`);
    const randBox = boxes[randomNumber]
    

    if(randBox.innerText === ""){
        randBox.innerText = "O"
        workDone = true
        console.log("Work Done")
        randBox.disabled = true;
    }
    return workDone
}



boxes.forEach((box) => {
    box.addEventListener("click", () => {
        clickSound.play();
        if(playerA){
            box.innerText = "X";
            playerA = false;
            turnConX.classList.add("hidden");
            trunConO.classList.remove("hidden");
            trunMsgO.innerText = "O Turn";
            if(pla == "Computer"){
                    let counter = 0;
                    while (!fillValue() && counter < (board*board)) {
                        counter++;
                    }
                    playerA = true;
                    if(counter > board*board){
                        playerA = false;
                    } 
                    trunConO.classList.add("hidden");
                    turnConX.classList.remove("hidden");
                    turnMsgX.innerText = "X Turn";
                }
        }
        else{
            box.innerText = "O";
            playerA = true;
            trunConO.classList.add("hidden");
            turnConX.classList.remove("hidden");
            turnMsgX.innerText = "X Turn";
        }
        box.disabled = true;
        checkWiner();
    });
});



    const showWinner = (winner) => {
        if(winner === "X"){
            congMsgX.innerText = `Winner ${winner}`;
            winnerConX.classList.remove("hidden");  
            trunConO.classList.add("hidden");
            let ScoreA = localStorage.getItem(`${User1}`)
            ScoreA = parseInt(ScoreA, 10);
            ScoreA += 100;
            localStorage.setItem(`${User1}`, ScoreA);
                   
        }
        else {
            congMsgO.innerText = `Winner ${winner}`;
            winnerConO.classList.remove("hidden");
            turnConX.classList.add("hidden");  
            let ScoreB = localStorage.getItem(`${User2}`)
            ScoreB = parseInt(ScoreB, 10);
            ScoreB += 100;
            localStorage.setItem(`${User2}`, ScoreB);
        }
        winnerSound.play()
        showRestMsg();
    };

    const disabledBtns = () => {
        for(let box of boxes){
            box.disabled = true;
        }
    };

    const enableBtns = () =>{
        for(let box of boxes){
            box.disabled = false;
            box.innerText = "";
            winnerConX.classList.add("hidden");
            winnerConO.classList.add("hidden");
        }
    };

    const checkWiner = () => {
        let checkTime = 0;
        let algo = localStorage.getItem('Board')
        algo = parseInt(algo, 10);
        if(algo === 3){
            for(let index of winPatterns) {
                let val1 =  boxes[index[0]].innerText;
                let val2 =  boxes[index[1]].innerText;
                let val3 =  boxes[index[2]].innerText;
                
                if(val1 != "" && val2 != "" && val3 != ""){
                    if(val1 === val2 && val2 === val3){
                        console.log("winner is - " , val3)   
                        showWinner(val3);
                        return;
                    }
                    checkTime++;
                    if(checkTime === winPatterns.length){
                        tieMssg.innerText = `Match Tie Resetting in 5 seconds...`;
                        tieMsg.classList.remove("hidden");
                        newGameBtn.disabled = true;
                        disabledBtns();
                        setTimeout(() => {
                            rstBtn.click();
                            newGameBtn.disabled = false;
                        }, 5000);

                        setTimeout(() => {
                            tieMsg.classList.add("hidden");
                        }, 6000);
                    }
                }
            }
        }
        if(algo === 4){
            for(let index of winPatternsQ) {
                let val1 =  boxes[index[0]].innerText;
                let val2 =  boxes[index[1]].innerText;
                let val3 =  boxes[index[2]].innerText;
                let val4 =  boxes[index[3]].innerText;
                
                
                
                if(val1 != "" && val2 != "" && val3 != "" && val4 != ""){
                    if(val1 === val2 && val2 === val3 && val3 === val4){
                        console.log("Winner is - " , val4)
                        disabledBtns();
                        showWinner(val4);
                        return;
                    }
                    checkTime++;
                    if(checkTime === winPatterns.length){
                        tieMssg.innerText = `Match Tie Resetting in 5 seconds...`;
                        tieMsg.classList.remove("hidden");
                        newGameBtn.disabled = true;
                        disabledBtns();
                        setTimeout(() => {
                            rstBtn.click();
                            newGameBtn.disabled = false;
                        }, 5000);

                        setTimeout(() => {
                            tieMsg.classList.add("hidden");
                        }, 6000);
                    }
                }
            }
        }
        if(algo === 5){
            for(let index of winPatternsR) {
                let val1 =  boxes[index[0]].innerText;
                let val2 =  boxes[index[1]].innerText;
                let val3 =  boxes[index[2]].innerText;
                let val4 =  boxes[index[3]].innerText;
                let val5 =  boxes[index[4]].innerText;
                
                if(val1 != "" && val2 != "" && val3 != "" && val4 != "" && val5 != ""){
                    if(val1 === val2 && val2 === val3 && val3 === val4 && val4 === val5){
                        console.log("Winner is - " , val5)
                        disabledBtns();
                        showWinner(val5);
                        return;
                    }
                    checkTime++;
                    if(checkTime === winPatterns.length){
                        tieMssg.innerText = `Match Tie Resetting in 5 seconds...`;
                        tieMsg.classList.remove("hidden");
                        newGameBtn.disabled = true;
                        disabledBtns();
                        setTimeout(() => {
                            rstBtn.click();
                            newGameBtn.disabled = false;
                        }, 5000);

                        setTimeout(() => {
                            tieMsg.classList.add("hidden");
                        }, 6000);
                    }
                }
            }
        }


        
    };


rstBtn.addEventListener("click", restBtn)
