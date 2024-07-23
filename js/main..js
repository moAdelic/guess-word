document.title = "guess word"

let footer = document.querySelector("footer")
footer.innerHTML ="GUESS WORD LUKA"

// start game settings
let numberofTries= 5;
let numberofleters = 6;
let currenttry = 1;
let numberofhint = 2;


// managewords
let guessword =''
let words = ["mainly",'elzero','create','update','delete','master','branch','school']
guessword = words[Math.floor(words.length * Math.random())].toLowerCase()
console.log(guessword)

// manage hint 
document.querySelector('.hint span').innerHTML= numberofhint;
let hintbtn = document.querySelector(".hint")
hintbtn.addEventListener("click",gethint)

function gethint(){
    if(numberofhint>0){
        numberofhint--;
        document.querySelector('.hint span').innerHTML= numberofhint;
    }

    if(numberofhint === 0){
        hintbtn.disabled = true;
        hintbtn.style.background = 'gray'
    }
    // to get input not disabled
    const notdisabledinput = document.querySelectorAll(`.inputs > div:not(.disabled-inputs) input`)
    // const notdisabledinput = document.querySelectorAll("input:not([disabled])")

    // console.log(notdisabledinput)
    let emptynotdisabledinput = Array.from(notdisabledinput).filter((input)=>input.value ==='')
    // to get input empty
    // console.log(emptynotdisabledinput)

    // let guesswordhint = Array.from(guessword)
    // // // console.log(guesswordhint)


    if(emptynotdisabledinput.length > 0){
        const randomindex = Math.floor(Math.random() * emptynotdisabledinput.length)
        // console.log(randomindex)
        const randominput = emptynotdisabledinput[randomindex]
        // console.log(randominput)
        let indextofill = Array.from(notdisabledinput).indexOf(randominput);
        if(indextofill != -1){
            randominput.value = guessword[indextofill].toUpperCase();
        }
        
    }

}




// function generate inputs
function generateinputs(){
    let inputscontainer = document.querySelector(".inputs")
    for (let i = 1; i <= numberofTries; i++) {

        let trydiv = document.createElement("div")
        trydiv.classList.add(`try${i}`)
        trydiv.innerHTML =`<span>Try${i}</span>`
        

        // create inputs
        if(i != 1) trydiv.classList.add("disabled-inputs")
        for (let j = 1; j <= numberofleters; j++) {
            let input = document.createElement("input")
            input.type = "text"
            input.id = `guess-${i}-letter-${j}`
            input.maxLength = "1"
            
            trydiv.appendChild(input)
        }
        inputscontainer.appendChild(trydiv)
        
    }
    inputscontainer.children[0].children[1].focus();

    // disabled all inputs except one
    let inputsindisableddiv = document.querySelectorAll(".disabled-inputs input")
    inputsindisableddiv.forEach((input)=>input.disabled = true)

    // all inputs vlaue to convet to upper case
    let allinputs = document.querySelectorAll("input")
    allinputs.forEach((input,index)=>{
        input.addEventListener("input",()=>{
            input.value = input.value.toUpperCase();
            let nextinput = allinputs[index + 1] 
            if (nextinput) nextinput.focus();
        })

        input.addEventListener("keydown",(event)=>{
            // console.log(event)
            let currentindex = Array.from(allinputs).indexOf(event.target)
            // console.log(currentindex)
            if(event.key ==="ArrowRight"){
                currentindex++;
                allinputs[currentindex].focus()
            }
            
            if(event.key ==="ArrowLeft"){
                currentindex--;
                if(currentindex>=0) allinputs[currentindex].focus()
                
            }

            
            
            
            
        })
    })

}



let checkbtn = document.querySelector(".check")
checkbtn.addEventListener("click",handleguess)

function handleguess(){
    let success = true;
    for (let i = 1; i <= numberofleters; i++) {
        const inputfield = document.querySelector(`#guess-${currenttry}-letter-${i}`)
        const inputfieldvalue = inputfield.value.toLowerCase();
        const actualletter = guessword[ i - 1]
        if(actualletter === inputfieldvalue){
            inputfield.classList.add("in-place")

        }else if(guessword.includes(inputfieldvalue) && inputfieldvalue !=="" ){
            inputfield.classList.add('not-in-place')
            success = false;
        }else{
            inputfield.classList.add("not-exist")
            inputfield.style.color = 'white'
            success = false
        }
        
    }

    // check if user is won or lose
    let message = document.querySelector(".message")
    if(success){
        message.innerHTML=`you guess is successful ${guessword}`
        message.style.background = '#f89e13' 
        // disabled all tries div
        alltrydiv = document.querySelectorAll(".inputs > div")
        alltrydiv.forEach((div)=> div.classList.add("disabled-inputs"))
        // disable check btn
        checkbtn.disabled = true;
        hintbtn.disabled = true;
    }else{

        // console.log(currenttry)
        document.querySelectorAll(`.try${currenttry} > input `).forEach((input)=> input.disabled = true)
        currenttry+=1;
        
        
        if(document.querySelector(`.try${currenttry}`)){
            alltrydiv = document.querySelectorAll(".inputs > div")
            alltrydiv.forEach((div)=> div.classList.add("disabled-inputs"))
            nexttry = document.querySelector(`.try${currenttry}`)
            // console.log(nexttry)
            nexttry.classList.remove('disabled-inputs')
            nexttryinput = document.querySelectorAll(`.try${currenttry} > input `)
            // console.log(nexttryinput)
            nexttryinput.forEach((input)=>input.disabled = false)
            nexttryinput[0].focus();
        }else{
            message.innerHTML=`Game over word is ${guessword}`
            message.style.background = '#f89e13' 
            checkbtn.disabled = true;
            checkbtn.style.background = 'gray'
            hintbtn.disabled = true;
            hintbtn.style.background = 'gray'
        }
    }

}
document.addEventListener("keydown",handlebackspace)
function handlebackspace(event){
    let allinputdisabled = document.querySelectorAll(".inputs > div:not(.disabled-inputs) input")
    currentindex = Array.from(allinputdisabled).indexOf(document.activeElement)
    
    if(event.key=== "Backspace"){
        if(currentindex > 0){
            currentinput = allinputdisabled[currentindex];
            prviousinput = allinputdisabled[currentindex - 1];
            currentinput.value = ''
            prviousinput.value =''
            prviousinput.focus()
        }
    }
}
window.onload = function(){
    generateinputs()
}
