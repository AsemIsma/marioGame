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
    if (event.key === 'w' || event.key === 'ArrowUp' ) {
       jump (); 
    } 
});

function jump () {

    mario = document.querySelector("#mario");

            posUp = posUp - 70;
            position = position + 10;

            mario.style.top = posUp + 'px';
            mario.style.left = position + "px";

    return position

}

function fall () {

    mario = document.querySelector("#mario");

            posUp = posUp + 70;

            position = position + 10;

            mario.style.top = posUp + 'px';
            mario.style.left = position + "px";


    return  position

}

let floorIds = [];

function addFloorWidth () {

    for (let i = 0; i <= width; i = i + 50) {
        if(i > (width/2 - 150) && i < ((width/2))) {
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
    console.log(pipe.style.top)
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

setInterval(() => {
    checkMarioFall()
    if(!(ifMarioTouchFl.includes(true))) {
        fall()
    }
    if (isColliding(mario, flag) === true) {
        document.querySelector(".win").style.visibility = "visible";
    }
    if (isOffScreen(mario)) {
        location.reload();
      }
    ifMarioTouchFl = [];
    }, 100)
    
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

            posElFl = flId.getBoundingClientRect();

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

