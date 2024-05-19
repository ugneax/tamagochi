const animalsContainer = document.querySelector('.animals') as HTMLElement
const startGameButton = document.querySelector('.startGame') as HTMLElement
const startContainer = document.querySelector('.startContainer') as HTMLElement
const mainGameContainer = document.querySelector('.mainGameContainer') as HTMLElement
const animalField = document.querySelector('.animalField') as HTMLElement
const hp: HTMLElement = document.querySelector('.hp') as HTMLElement
const hungryLevel = document.querySelector('.hungryLevel') as HTMLElement
const funLevel = document.querySelector('.funLevel') as HTMLElement
const level = document.querySelector('.level') as HTMLElement
const feedMeButton = document.querySelector('.feedMe') as HTMLElement
const playMeButton = document.querySelector('.playMe') as HTMLElement
const foodModal = document.querySelector('.food') as HTMLElement
const gameISOver = document.querySelector('.gameOver') as HTMLElement


interface AnimalInterface{
    animalElement: HTMLElement
    stats:{
        hp: number,
        hungry: number,
        fun: number
    },
    level:number
}

let myAnimal: AnimalInterface;
let animalCharacters: string[] = ['🐒', '🦉', '🐌', '🐝', '🦕', '🦒','🐓', '🐈‍⬛','🐍','‍🐬','🐇','🦩', '🦓','🐥','🐘', '🦍', '🪼','🐧','🦆','🦇','🦔']
let animalChose: boolean = false
let animalFood: string[] = ['🍉', '🍑', '🍅', '🌭', '🥪','🍭', '🥩', '🍿', '🍡', '🥖']
let animalBabyFood: string[] = ['🍼', '🥛', '🍯']
let feedAnimalModalState: boolean = false;
let animalSize:number = 50
let gameOverStatus: boolean = false

function gameInit(): void{
    animalsContainer.innerHTML = ''
    animalCharacters.forEach(item =>{
        animalsContainer.innerHTML += `<div class="animal">${item}</div>`
    })

    let animalElement = document.querySelectorAll('.animal') as NodeListOf <HTMLElement>

    animalElement.forEach((animal, index) =>{
        animal.onclick = () =>{
            chooseAnimal(animal);
        }
    })

    startGameButton.onclick = (): void =>{
        startGame()
    }
}

function chooseAnimal(animalElement : HTMLElement):void{
    if(animalChose) {
        return
    }

    animalElement.className = " active"
    animalChose = true
    myAnimal = {
        animalElement: animalElement,
        stats:{
            hp: 100,
            hungry: 100,
            fun: 100
        },
        level:1
    }

}

function startGame(): void{
    startContainer.style.display = 'none'
    mainGameContainer.style.display = "flex"
    animalField.innerHTML = `<div class="myAnimal">${myAnimal.animalElement.innerHTML}</div>`
    hp.style.backgroundColor ="green"
    hungryLevel.style.backgroundColor ="green"
    funLevel.style.backgroundColor ="green"
    level.innerText = myAnimal.level.toString()

    let gameIntervals:number = setInterval(function () {
        if(gameOverStatus){
            clearInterval(gameIntervals)
            return
        }
        statsDropping()
        updateStats()
        gameOver()
    },1000)
    feedAnimalInit()
    playWithAnimal()
    levelUp()
    gameOver()
}

gameInit()

function updateStats():void{
    hungryLevel.style.width = `${myAnimal.stats.hungry}%`
    funLevel.style.width = `${myAnimal.stats.fun}%`
    hp.style.width = `${myAnimal.stats.hp}%`

    if(myAnimal.stats.hp >= 60){
        hp.style.backgroundColor ="green"
    }
    if(myAnimal.stats.fun >= 60){
        funLevel.style.backgroundColor ="green"
    }
    if(myAnimal.stats.hungry <= 60){
        hungryLevel.style.backgroundColor ="orange"
    }
    if(myAnimal.stats.fun <= 60){
        funLevel.style.backgroundColor ="orange"
    }
    if(myAnimal.stats.hungry <= 60){
        hungryLevel.style.backgroundColor ="orange"
    }
    if(myAnimal.stats.hp <= 30){
        hp.style.backgroundColor ="red"
    }
    if(myAnimal.stats.fun <= 30){
        funLevel.style.backgroundColor ="red"
    }
    if(myAnimal.stats.hungry <= 30){
        hungryLevel.style.backgroundColor ="red"
    }
}
function statsDropping():void{
    let decre: number = 1;
    if(myAnimal.level >= 60){
        decre = 5;
    }else if(myAnimal.level >= 30){
        decre = 3;
    }

    myAnimal.stats.hungry -= myAnimal.stats.hungry <= 0 ? 0 : decre
    myAnimal.stats.fun -= myAnimal.stats.fun <= 0 ? 0 : decre
    if(myAnimal.stats.hungry <= 30 || myAnimal.stats.fun <= 30 ){
        myAnimal.stats.hp -= 1
    }
}

function feedAnimalInit():void{
    feedMeButton.onclick = ():void =>{
        if(feedAnimalModalState)
        {
            return;
        }

        feedAnimalModalState = true

        if(myAnimal.level <= 5){
            animalBabyFood.forEach(item =>{
                foodModal.innerHTML += `<div class="foodItem">${item}</div>`
                foodModal.style.display ="flex"
            })
        } else if(myAnimal.level > 5){
            animalFood.forEach(item =>{
                foodModal.innerHTML += `<div class="foodItem">${item}</div>`
                foodModal.style.display ="flex"
            })
        }

        let foodItem = document.querySelectorAll('.foodItem') as NodeListOf <HTMLElement>
        foodItem.forEach((item, index) =>{
            item.onclick = (): void =>{
                feedAnimal()
            }
        })
    }
}

function feedAnimal():void {
    feedAnimalModalState = false;
    foodModal.innerHTML = ''
    if(myAnimal.stats.hungry >= 95){
        foodModal.style.display ="none"
        return
    }

    myAnimal.stats.hungry += 5
    updateStats()
    foodModal.style.display ="none"
}

function playWithAnimal():void{
    playMeButton.onclick = () => {
        if (myAnimal.stats.fun >= 97) {
            return
        }
        myAnimal.stats.fun += 2
        updateStats()
    }
}

function levelUp(): void{
    let levelUpInterval:number = setInterval(function () {
        if(gameOverStatus){
            clearInterval(levelUpInterval)
            return
        }
        myAnimal.level += 1
        level.innerText = myAnimal.level.toString()
        animalSize += 5
        const itemAnimal = document.querySelector('.myAnimal') as HTMLElement
        itemAnimal.style.fontSize = `${animalSize}px`
    },5000)

}

function gameOver():void{
    if(myAnimal.stats.hp <= 0){
        const itemAnimal = document.querySelector('.myAnimal') as HTMLElement
        itemAnimal.innerHTML = ``
        myAnimal.stats.fun = 0
        myAnimal.stats.hungry = 0
        updateStats()
        gameOverStatus = true
        mainGameContainer.style.opacity = "20%"
        gameISOver.style.display = "block"
    }
}