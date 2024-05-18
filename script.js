const switchMode = document.getElementById('lightThing');
const html = document.getElementById('themeSwitch');
const switchIcon = document.getElementById('switchIcon');
let isDark = false;

function darkModeSwitch(){
    if(isDark){
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'light');
        switchIcon.classList.add('fas', 'fa-sun');
        switchIcon.classList.remove('fa-moon');
        isDark = false;
    }
    else{
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'dark');
        switchIcon.classList.add('fas', 'fa-moon');
        switchIcon.classList.remove('fa-sun');
        isDark = true;
    }
}
darkModeSwitch();

switchIcon.addEventListener('click', ()=>{
    darkModeSwitch();
});

