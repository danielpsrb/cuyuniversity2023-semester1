let body=document.body
let darkRed=document.getElementById('red')
let dark=document.getElementById('dark')
let darkLime=document.getElementById('lime')
let navbar=document.querySelector('.container nav ')
let navfont=document.querySelector('.container nav a ')
let home=document.getElementById('reload')
let info=document.getElementById('info')

const modeLimit=7;
let modeCounter=0;
let modeRemaining;

function darkMode(){

    darkRed.style.display='none'
    darkLime.style.display='none'
    dark.style.display='none'

    body.classList.toggle('dark')
    dark.classList.toggle('navdark')
    navfont.classList.toggle('navdark')
    navbar.classList.toggle('navdark')
       
    home.textContent='BACK TO LIGHT MODE'      
}


function redDark(){

    darkRed.style.display='none'
    darkLime.style.display='none'
    dark.style.display='none'

    dark.classList.toggle('navdarkred')
    navfont.classList.toggle('navdarkred')
    navbar.classList.toggle('navdarkred')
    body.classList.toggle('darkred')

    home.textContent='BACK TO LIGHT MODE'
}

function limeDark(){

    darkRed.style.display='none'
    darkLime.style.display='none'
    dark.style.display='none'

    dark.classList.toggle('navdarklime')
    navfont.classList.toggle('navdarklime')
    navbar.classList.toggle('navdarklime')
    body.classList.toggle('darklime')

    home.textContent='BACK TO LIGHT MODE'
}


function reload(){
    location.reload()
}