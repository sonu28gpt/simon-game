let gameSeq=[];
let userSeq=[];


let level=0;
let started=false;
let highscore=0;

let btns=["yellow","green","red","purple"];
let h2=document.querySelector('h2');
document.addEventListener("keypress",()=>{
    if(started===false){
        level=0;
       
        // console.log("started");
        started=true;

        levelUp();
    }
});

function gameFlash(btn){
    
    btn.classList.add("flash");
    setTimeout(()=>{
        btn.classList.remove("flash")
    },400);
}
function userFlash(btn){
    
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash")
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
    let rand=Math.floor(Math.random()*4);
    let btn=btns[rand];
    gameSeq.push(btn);
    btn=document.querySelector(`.${btn}`);
    gameFlash(btn);
}


function checkAns(idx){
 if(gameSeq[idx]===userSeq[idx]){
        if(gameSeq.length===userSeq.length){
            setTimeout(levelUp(),1000);
        }
        // userSeq=[];
    }else{
        if(highscore<level-1){
            highscore=level-1;
        }
       h2.innerHTML=`Game Over! <b> Your score was ${level-1}  and highest score was ${highscore}</b> <br>Press any key to start `;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(()=>{
            document.querySelector("body").style.backgroundColor="white";
        },100);
        started=false;
        userSeq=[];
        gameSeq=[];
    }
}

function btnPress(){
    if(gameSeq.length===0){
        alert("game is not started yet by you")
        return ;
    }
    userSeq.push(this.getAttribute("id"));
    // console.log(this.getAttribute("id"));
    userFlash(this);
    checkAns(userSeq.length-1);
    // console.log("game",gameSeq);
    // console.log("user",userSeq)
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}