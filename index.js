"use strict";
const animalsContainer = document.querySelector('.animals');
const startGameButton = document.querySelector('.startGame');
const startContainer = document.querySelector('.startContainer');
const mainGameContainer = document.querySelector('.mainGameContainer');
const animalField = document.querySelector('.animalField');
const hp = document.querySelector('.hp');
const hungryLevel = document.querySelector('.hungryLevel');
const funLevel = document.querySelector('.funLevel');
const level = document.querySelector('.level');
const feedMeButton = document.querySelector('.feedMe');
const playMeButton = document.querySelector('.playMe');
const foodModal = document.querySelector('.food');
const gameISOver = document.querySelector('.gameOver');
let myAnimal;
let animalCharacters = ['🐒', '🦉', '🐌', '🐝', '🦕', '🦒', '🐓', '🐈‍⬛', '🐍', '‍🐬', '🐇', '🦩', '🦓', '🐥', '🐘', '🦍', '🪼', '🐧', '🦆', '🦇', '🦔'];
let animalChose = false;
let animalFood = ['🍉', '🍑', '🍅', '🌭', '🥪', '🍭', '🥩', '🍿', '🍡', '🥖'];
let animalBabyFood = ['🍼', '🥛', '🍯'];
let feedAnimalModalState = false;
let animalSize = 50;
let gameOverStatus = false;
function gameInit() {
    animalsContainer.innerHTML = '';
    animalCharacters.forEach(item => {
        animalsContainer.innerHTML += `<div class="animal">${item}</div>`;
    });
    let animalElement = document.querySelectorAll('.animal');
    animalElement.forEach((animal, index) => {
        animal.onclick = () => {
            chooseAnimal(animal);
        };
    });
    startGameButton.onclick = () => {
        if (animalChose) {
            startGame();
        }
    };
}
function chooseAnimal(animalElement) {
    if (animalChose) {
        return;
    }
    animalElement.className = " active";
    animalChose = true;
    myAnimal = {
        animalElement: animalElement,
        stats: {
            hp: 100,
            hungry: 100,
            fun: 100
        },
        level: 1
    };
}
function startGame() {
    startContainer.style.display = 'none';
    mainGameContainer.style.display = "flex";
    animalField.innerHTML = `<div class="myAnimal">${myAnimal.animalElement.innerHTML}</div>`;
    hp.style.backgroundColor = "green";
    hungryLevel.style.backgroundColor = "green";
    funLevel.style.backgroundColor = "green";
    level.innerText = myAnimal.level.toString();
    let gameIntervals = setInterval(function () {
        if (gameOverStatus) {
            clearInterval(gameIntervals);
            return;
        }
        statsDropping();
        updateStats();
        gameOver();
    }, 1000);
    feedAnimalInit();
    playWithAnimal();
    levelUp();
    gameOver();
}
gameInit();
function updateStats() {
    hungryLevel.style.width = `${myAnimal.stats.hungry}%`;
    funLevel.style.width = `${myAnimal.stats.fun}%`;
    hp.style.width = `${myAnimal.stats.hp}%`;
    if (myAnimal.stats.hp >= 60) {
        hp.style.backgroundColor = "green";
    }
    if (myAnimal.stats.fun >= 60) {
        funLevel.style.backgroundColor = "green";
    }
    if (myAnimal.stats.hungry <= 60) {
        hungryLevel.style.backgroundColor = "orange";
    }
    if (myAnimal.stats.fun <= 60) {
        funLevel.style.backgroundColor = "orange";
    }
    if (myAnimal.stats.hungry <= 60) {
        hungryLevel.style.backgroundColor = "orange";
    }
    if (myAnimal.stats.hp <= 30) {
        hp.style.backgroundColor = "red";
    }
    if (myAnimal.stats.fun <= 30) {
        funLevel.style.backgroundColor = "red";
    }
    if (myAnimal.stats.hungry <= 30) {
        hungryLevel.style.backgroundColor = "red";
    }
}
function statsDropping() {
    let decre = 1;
    if (myAnimal.level >= 60) {
        decre = 5;
    }
    else if (myAnimal.level >= 30) {
        decre = 3;
    }
    myAnimal.stats.hungry -= myAnimal.stats.hungry <= 0 ? 0 : decre;
    myAnimal.stats.fun -= myAnimal.stats.fun <= 0 ? 0 : decre;
    if (myAnimal.stats.hungry <= 30 || myAnimal.stats.fun <= 30) {
        myAnimal.stats.hp -= 1;
    }
}
function feedAnimalInit() {
    feedMeButton.onclick = () => {
        if (feedAnimalModalState) {
            return;
        }
        feedAnimalModalState = true;
        if (myAnimal.level <= 5) {
            animalBabyFood.forEach(item => {
                foodModal.innerHTML += `<div class="foodItem">${item}</div>`;
                foodModal.style.display = "flex";
            });
        }
        else if (myAnimal.level > 5) {
            animalFood.forEach(item => {
                foodModal.innerHTML += `<div class="foodItem">${item}</div>`;
                foodModal.style.display = "flex";
            });
        }
        let foodItem = document.querySelectorAll('.foodItem');
        foodItem.forEach((item, index) => {
            item.onclick = () => {
                feedAnimal();
            };
        });
    };
}
function feedAnimal() {
    feedAnimalModalState = false;
    foodModal.innerHTML = '';
    if (myAnimal.stats.hungry >= 95) {
        foodModal.style.display = "none";
        return;
    }
    myAnimal.stats.hungry += 5;
    updateStats();
    foodModal.style.display = "none";
}
function playWithAnimal() {
    playMeButton.onclick = () => {
        if (myAnimal.stats.fun >= 97) {
            return;
        }
        myAnimal.stats.fun += 2;
        updateStats();
    };
}
function levelUp() {
    let levelUpInterval = setInterval(function () {
        if (gameOverStatus) {
            clearInterval(levelUpInterval);
            return;
        }
        myAnimal.level += 1;
        level.innerText = myAnimal.level.toString();
        animalSize += 5;
        const itemAnimal = document.querySelector('.myAnimal');
        itemAnimal.style.fontSize = `${animalSize}px`;
    }, 5000);
}
function gameOver() {
    if (myAnimal.stats.hp <= 0) {
        const itemAnimal = document.querySelector('.myAnimal');
        itemAnimal.innerHTML = ``;
        myAnimal.stats.fun = 0;
        myAnimal.stats.hungry = 0;
        updateStats();
        gameOverStatus = true;
        mainGameContainer.style.opacity = "20%";
        gameISOver.style.display = "block";
    }
}
