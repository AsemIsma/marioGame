let height = window.innerHeight;

let width = window.innerWidth;

let mario = document.querySelector("#mario");
let flag = document.querySelector("#ffff");




let position = 0;

document.addEventListener('keydown',event => {
    if (event.key === 'd' || event.key === 'ArrowRight') {
        moveFor (); 
        if (isColliding(mario, flag) === true) {
        document.querySelector(".win").style.visibility = "visible";
    }
     } 

});



function moveFor () {

    mario = document.querySelector("#mario");
    
    position = position + 20;
    
    mario.style.left = position + "px";

    return position
}

let posUp = height - 130;

document.addEventListener('keydown', event => {
    if (event.key === 'w') {
       jump (); 
       if (isColliding(mario, flag) === true) {
        document.querySelector(".win").style.visibility = "visible";
    }
    } else if (event.key === 'ArrowUp') {
        jump (); 
        if (isColliding(mario, flag) === true) {
            document.querySelector(".win").style.visibility = "visible";
        }
     }
});

document.addEventListener('keyup', event => {
    if (event.key === 'w' || event.key === 'ArrowUp') {
        fall(); 
        if (isColliding(mario, flag) === true) {
            document.querySelector(".win").style.visibility = "visible";
        }
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


function addFloorWidth () {

    for (let i = 50; i <= width; i = i + 50) {
        document.querySelector(".container").innerHTML += `<img class="floor" id='${i}' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKm5xQYisiRipwq7pQwyyUTX0TEfRNmoM0CQ&s">`;
    }
    
}

addFloorWidth()

function flagPosLeft () {
    flag = document.querySelector("#ffff");

    flag.style.left = (width - 150) + 'px';
}

flagPosLeft ()

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

