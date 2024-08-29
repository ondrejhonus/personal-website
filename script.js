const switchMode = document.getElementById('lightThing');
const html = document.getElementById('themeSwitch');
const switchIcon = document.getElementById('switchIcon');

let isDark = JSON.parse(localStorage.getItem('isDark')) || true;

function darkModeSwitch() {
    if (isDark) {
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'light');
        switchIcon.classList.add('fas', 'fa-sun');
        switchIcon.classList.remove('fa-moon');
        isDark = false;
        localStorage.setItem("isDark", false);
    }
    else {
        html.removeAttribute('data-theme');
        html.setAttribute('data-theme', 'dark');
        switchIcon.classList.add('fas', 'fa-moon');
        switchIcon.classList.remove('fa-sun');
        isDark = true;
        localStorage.setItem("isDark", true);
    }
}
darkModeSwitch();
darkModeSwitch();

switchIcon.addEventListener('click', () => {
    darkModeSwitch();
});

const emailP = document.getElementById('email').innerHTML += `<a href="mailto:ondrejhonus@proton.me" target="_blank">ondrejhonus@proton.me</a>`;