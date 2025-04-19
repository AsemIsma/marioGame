let height = window.innerHeight;
let width = window.innerWidth;

let mario = document.querySelector("#mario");
let flag = document.querySelector("#ffff");
let pipe = document.querySelector(".pipe");

let posUp = height - 130;
let position = 5;

document.addEventListener('keydown',event => {
    if (event.key === 'd' || event.key === 'ArrowRight') {
        moveFor (); 
    } 

});


function moveFor () {
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
            posUp = posUp - 40;
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
            let img = document.createElement("img");
            img.className = "hole";
            img.id = "b" + i;
            document.querySelector(".container").appendChild(img);

        } else {
            let img = document.createElement("img");
            img.className = "floor";
            img.id = "a" + i;
            img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKm5xQYisiRipwq7pQwyyUTX0TEfRNmoM0CQ&s";
            document.querySelector(".container").appendChild(img);

            floorIds.push(`a` + i);
        }        
    }
    
}

addFloorWidth()

function flagPosLeft () {
    flag.style.left = (width - 150) + 'px';
}

flagPosLeft ()

function pipeOnFl () {
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

let coins = [];

function makeCoin () {
    for (let i = 4; i > 0; i--) {
        let coin = document.querySelector(`#c${i}`);
        if (i === 1) {
            coin.style.left = (width * 3/4) + 'px';

        } else {
            coin.style.left = (width/i) + 'px';
        }

        let img = document.createElement("img");
        img.className = "fl";
        img.id = "a" + i;
        img.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkMtIF-QvKzr_H8Fb5oXUcYISHE85c5outLg&s";
        document.querySelector(".container").appendChild(img);

        floorIds.push(`a` + i);
        
        coin.style.top = (height * 1/3) + 'px';

        coins.push(`#c${i}`);
   
    }

}

makeCoin ()

function collectCoin () {
    for(let i = 0; i < coins.length; i++){
        coin = document.querySelector(coins[i]);
        if (isColliding(mario, coin)) {
        coin.style.visibility = "hidden";
    }
    }

}

setInterval(() => {
    checkMarioFall()
    if(!(ifMarioTouchFl.includes(true))) {
        fall()
    } 
    if (isColliding(mario, flag) === true) {
        document.querySelector(".win").style.visibility = "visible";
        setTimeout(() => {location.reload()}, 1000);
    }
    if (isOffScreen(mario)) {
        document.querySelector(".win").innerHTML = "You lose";
        document.querySelector(".win").style.visibility = "visible";
        document.querySelector(".win").style.color = "black";
        setTimeout(() => {
            location.reload();
        }
        , 1000)
      }
    ifMarioTouchFl = [];
    collectCoin();

    FJarr = [];
    }
    , 50)
    
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

//     if (el2 === FJ) {

//         posFJ = FJ.getBoundingClientRect();

//     return !(
//         posEl1.right < posFJ.left
//         ||
//         posEl1.left > posFJ.right 
//         ||
//         posEl1.bottom < posFJ.top - 20
//         ||
//         posEl1.top > posFJ.bottom 
//       );
      
// }

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

