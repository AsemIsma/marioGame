let height = window.innerHeight;
let width = window.innerWidth;

let mario = document.querySelector("#mario");
let flag = document.querySelector("#ffff");
let floor = document.querySelector(".floor");
let pipe = document.querySelector(".pipe");

let posUp = height - 130;
let position = 5;

document.addEventListener('keydown',event => {
    if (event.key === 'd' || event.key === 'ArrowRight') {
        moveFor (); 
    } 

});


function moveFor () {

    mario = document.querySelector("#mario");
    
    position = position + 20;
    
    mario.style.left = position + "px";

    return position
}


document.addEventListener('keydown', event => {
    if (event.key === 'space' ) {
        doubleJump()
    } else if (event.key === 'w' || event.key === 'ArrowUp' ) {
       jump (); 
    } 
});

function jump () {

    mario = document.querySelector("#mario");

            posUp = posUp - 40;
            position = position + 10;

            mario.style.top = posUp + 'px';
            mario.style.left = position + "px";

    return position

}

function doubleJump () {

    mario = document.querySelector("#mario");

            posUp = posUp - 1000;
            position = position + 10;

            mario.style.top = posUp + 'px';
            mario.style.left = position + "px";

    return position

}

function fall () {

    mario = document.querySelector("#mario");

            posUp = posUp + 40;

            position = position + 10;

            mario.style.top = posUp + 'px';
            mario.style.left = position + "px";


    return  position

}

let floorIds = [];

function addFloorWidth () {

    for (let i = 0; i <= width; i = i + 50) {
        if(i > (width/2 - 200) && i < (width/2 + 100) || width > 770 && i > (width/4 - 150) && i < (width/4 + 350) || width > 1000  && i > ((width * 3/4) - 250) && i < (width * 3/4 + 150)) {
            document.querySelector(".container").innerHTML += `<img class="hole" id='b${i}'>`;
        } else {
            document.querySelector(".container").innerHTML += `<img class="floor" id='a${i}' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKm5xQYisiRipwq7pQwyyUTX0TEfRNmoM0CQ&s">`;
            floorIds.push(`a` + i);
        }        
    }
    
}

addFloorWidth()

function flagPosLeft () {
    flag = document.querySelector("#ffff");

    flag.style.left = (width - 150) + 'px';
}

flagPosLeft ()

function pipeOnFl () {
    pipe = document.querySelector('.pipe');
    pipe.style.top = (height - 100) + 'px';
}

pipeOnFl()

let ifMarioTouchFl = [];

function checkMarioFall () {
    for (let i = 0; i < floorIds.length; i++) {
        flId = document.querySelector(`#${floorIds[i]}`);
        ifMarioTouchFl.push(isColliding(mario, flId));
    }
}

checkMarioFall()
console.log(ifMarioTouchFl)

let FJarr = [];

function collectCoin () {
    for (let i = 4; i > 0; i--) {
        let coin = document.querySelector(`#c${i}`);
        FJ = document.querySelector(`.FJ${i}`);
        if (i === 1) {
            coin.style.left = (width * 3/4) + 'px';
            FJ.style.left = (width * 3/4) + 'px';
        } else {
            coin.style.left = (width/i) + 'px';
            FJ.style.left = (width/i) + 'px';
        }

        coin.style.top = (height * 1/3) + 'px';
        FJ.style.top = (height * 1/3 + 50) + 'px';

        FJarr.push(isColliding(mario, FJ));

    }
}



collectCoin ()

setInterval(() => {
    checkMarioFall()
    if(!(ifMarioTouchFl.includes(true))) {
        fall()
    } 
    if (FJarr.includes(true)) {
        console.log(FJarr)
        jump()
    }
    if (isColliding(mario, flag) === true) {
        document.querySelector(".win").style.visibility = "visible";
    }
    if (isOffScreen(mario)) {
        location.reload();
      }
    ifMarioTouchFl = [];
    collectCoin();

    FJarr = [];
    }
    , 100)
    
function isOffScreen(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.bottom < 0 ||
        rect.top > window.innerHeight ||
        rect.right < 0 ||
        rect.left > window.innerWidth
    );
    }
      

function isColliding (el1, el2) {
    const posEl1 = el1.getBoundingClientRect();
    const posEl2 = el2.getBoundingClientRect();

    if (el2 === flag) {
        return !(
            posEl1.right < posEl2.left + 50 
            ||
            posEl1.left > posEl2.right 
            ||
            posEl1.bottom < posEl2.top 
            ||
            posEl1.top > posEl2.bottom
          );
    }

    if (el2 === flId) {

            posElFl = el2.getBoundingClientRect();

        return !(
            posEl1.right < posElFl.left
            ||
            posEl1.left > posElFl.right 
            ||
            posEl1.bottom < posElFl.top - 20
            ||
            posEl1.top > posElFl.bottom 
          );
          
    }

    if (el2 === FJ) {

        posFJ = FJ.getBoundingClientRect();

    return !(
        posEl1.right < posFJ.left
        ||
        posEl1.left > posFJ.right 
        ||
        posEl1.bottom < posFJ.top - 20
        ||
        posEl1.top > posFJ.bottom 
      );
      
}

    return !(
        posEl1.right < posEl2.left
        ||
        posEl1.left > posEl2.right 
        ||
        posEl1.bottom < posEl2.top 
        ||
        posEl1.top > posEl2.bottom
      );
}

