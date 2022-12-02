

const score = document.querySelector('.score');
const startScreen = document.querySelector('.startScreen');
const gameArea = document.querySelector('.gameArea');

startScreen.addEventListener('click',start);
let player = {speed:5,score:0};

let keys = { ArrowUp : false, ArrowDown : false, ArrowLeft : false, ArrowRight : false}

document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    // console.log(e.key);
    // console.log(keys)
}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
    // console.log(e.key);
    
}
// what happens when our get collide with enemy car
function isCollide(a,b){
    // aRect denote our Car and bRect denote enmy car
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.top>bRect.bottom) || (aRect.bottom<bRect.top) || (aRect.right<bRect.left) || (aRect.left>bRect.right))
}
// procedure to move road lines
function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
        if(item.y>=550){
            item.y-=600;
        }
        item.y += player.speed;
        item.style.top=item.y+"px";
    })
}
// method to end the game on colliding
function endgame(){
    player.start=false;
    startScreen.classList.remove('hide');
    score.classList.add('hide');
    startScreen.innerHTML = "Game Over!! <br> Final Score : "+player.score + "<br>Press here to play again.";
    
}
// procedure to move enemy
function moveEnemy(car){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
// isCollide function when our car get collide with enemy car
        if(isCollide(car,item)){
            console.log("boom");
            endgame();
        }
        if(item.y>=550){
            item.y=-250;
            item.style.left = Math.floor(Math.random()*350)+"px";
        }
        
        item.y += player.speed;
        item.style.top=item.y+"px";
    })
}

// procedure to move car in gameArea
function gamePlay(){
    // console.log("clicked");
    let car = document.querySelector('.car');
    let road = gameArea.getBoundingClientRect();
    // console.log(road);
    if(player.start){
        moveLines();
        moveEnemy(car);

        if(keys.ArrowUp && player.y>(road.top+70)){
            player.y-= player.speed;
        }
        if(keys.ArrowDown && player.y<(road.bottom-160)){
            player.y += player.speed;
        }
        if(keys.ArrowLeft && player.x>0){
            player.x-= player.speed;
        }
        if(keys.ArrowRight && player.x<(road.width-30)){
            player.x+= player.speed;
        }
        car.style.top = player.y+"px";
        car.style.left = player.x+"px";
        window.requestAnimationFrame(gamePlay);


// score box
        // console.log(player.score++);
        player.score++;
        let ps = player.score - 1;
        score.innerText="Score:"+" "+ps;
    }
}

function start(){
    // gameArea.classList.remove('hide');
    startScreen.classList.add('hide');
    gameArea.innerHTML=" ";
    player.start=true;
    player.score = 0;
    window.requestAnimationFrame(gamePlay);
    score.classList.remove('hide');

// creation of road lines and adding it to gameArea    
    for(x=0;x<5;x++){
        let roadLine = document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y = (x*150);
        roadLine.style.top=roadLine.y+"px";
        gameArea.appendChild(roadLine);
    
    }
   
// creation of car and adding it gameArea
    let car = document.createElement('div');
    car.setAttribute('class','car');
    // car.innerText="I'm your car";
    gameArea.appendChild(car);
    
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    
    // console.log("top position "+car.offsetTop);
    // console.log("left position"+car.offsetLeft);
    for(x=0;x<3;x++){
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class','enemy');
        enemyCar.y = ((x+1)*350) *-1;
        enemyCar.style.top=enemyCar.y+"px";
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random()*350)+"px";
        gameArea.appendChild(enemyCar);
    
    }
}
function randomColor(){
    function c(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ('0'+String(hex)).substring(1)
    }
    return "#"+c()+c()+c();
}