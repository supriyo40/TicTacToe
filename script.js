console.log("it's a tic tac toe");

let turnMusic = new Audio("asset/ting.mp3");
let music = new Audio("asset/music.mp3");
let overMusic = new Audio("asset/gameover.mp3");
let translateValueX = null;
let translateValueY = null;
let lineWidth = null;

let turn = "X";
let winningIndex = null

let info = document.querySelector('.info');
let boxTexts = document.querySelectorAll('.blockText')
let isOver = false;


// function to change turn
const changeTurn = ()=>{
    return turn === "X" ? "0" : "X"
}

// function to check a win
const checkWin = ()=>{
    let wins = [
        [0,1,2,2.5,5,0],
        [3,4,5,2.5,15,0],
        [6,7,8,2.5,25,0],
        [0,3,6,-7.5,15,90],
        [1,4,7,2.5,15,90],
        [2,5,8,12.5,15,90],
        [0,4,8,2.5,15,45],
        [2,4,6,2.5,15,135]
    ]
    wins.forEach((e)=>{
        if((boxTexts[e[0]].innerHTML === boxTexts[e[1]].innerHTML) && (boxTexts[e[2]].innerHTML === boxTexts[e[1]].innerHTML) && (boxTexts[e[0]].innerHTML !== '')){
            boxTexts[e[0]].classList.add('winner')
            boxTexts[e[1]].classList.add('winner')
            boxTexts[e[2]].classList.add('winner')
            winningIndex = e;
            info.innerHTML = boxTexts[e[0]].innerHTML + " WON"
            isOver = true
            overMusic.play()

            if(window.innerWidth < 500){
            translateValueX = e[3]*2;
            translateValueY = e[4]*2;
            lineWidth = '50vw';
            }
            else if(window.innerWidth < 700){
                translateValueX = e[3]*1.4;
                translateValueY = e[4]*1.4;
                lineWidth = '35vw';
            }
            else{
                translateValueX = e[3];
                translateValueY = e[4];
                lineWidth = '25vw';
            }

            document.querySelector('img').style.transform = 'scale(1)'
            document.querySelector('.line').style.transform = `translate(${translateValueX}vw, ${translateValueY}vw) rotate(${e[5]}deg)`
            document.querySelector('.line').style.width = `${lineWidth}`
        }
    })
}

// Adjust translation, rotation, and width values based on media query
// let translateValue = window.innerWidth < 700 ? e[3] * 0.7 : e[3];
// let rotateValue = window.innerWidth < 700 ? e[5] / 2 : e[5];
// let lineWidth = window.innerWidth < 700 ? '50vw' : '25vw';

// document.querySelector('img').style.transform = 'scale(1)';
// document.querySelector('.line').style.transform = `translate(${translateValue}vw, ${e[4]}vw) rotate(${rotateValue}deg)`;
// document.querySelector('.line').style.width = lineWidth;

// main logic
// music.play()
let boxes = document.querySelectorAll(".block")

// Array.from(boxes).forEach((e)=>{
// let boxText = e.querySelector(".blockText")
// e.addEventListener('click',()=>{
//     if (!isOver && boxText.innerHTML === ""){
//         boxText.innerHTML = turn;
//         turn = changeTurn();
//         turnMusic.play();
//         checkWin();
//         if(!isOver){
//             info.innerHTML = "turn for " + turn;
//         }
//     }
// })
// })

document.querySelector('.container').addEventListener('click',(e)=>{
    if(e.target.classList.contains('block')){
        let boxText = e.target.querySelector(".blockText")
        if (!isOver && boxText.innerHTML === ""){
            boxText.innerHTML = turn;
            turn = changeTurn();
            turnMusic.play();
            checkWin();
            if(!isOver){
                info.innerHTML = "turn for " + turn;
            }
        }
    }
})

// reset function
document.querySelector('#reset').addEventListener('click',()=>{
    boxTexts[winningIndex[0]].classList.remove('winner')
    boxTexts[winningIndex[1]].classList.remove('winner')
    boxTexts[winningIndex[2]].classList.remove('winner')
    Array.from(boxes).forEach((e)=>{
        e.querySelector(".blockText").innerHTML = ""
        isOver = false
        turn = 'X'
        document.querySelector('img').style.transform = 'scale(0)'
        document.querySelector('.line').style.width = '0vw'
        info.innerHTML = "turn for " + turn
    })
})