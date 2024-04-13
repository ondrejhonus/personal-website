function toggleLightMode() {
    const lightThingDiv = document.querySelector('.lightThing');
    const imgElement = document.createElement('img');
    const buttons = document.querySelectorAll('.buttons-section');
    let isLight = JSON.parse(localStorage.getItem('isLight')) || false;

    function toggleMode() {
        const body = document.body;
        const darkButtonBackground = '#20204e';
        const lightBackground = '#82a9e4';
        const lightText = '#0e1125';
        const darkBackground = '#0e1125';
        const darkText = '#a5c3f1';

        body.style.transition = 'background-color 0.5s, color 0.5s';
        buttons.forEach(button => {
            button.style.transition = 'background-color 0.5s, color 0.5s';
        });

        setTimeout(() => {
            body.style.backgroundColor = isLight ? lightBackground : darkBackground;
            body.style.color = isLight ? lightText : darkText;

            buttons.forEach(button => {
                button.style.backgroundColor = isLight ? darkBackground : darkButtonBackground;
            });
            if (!isLight){
                imgElement.src = 'img/sun.png';
                imgElement.alt = 'lightMode';
                imgElement.classList.add('lightMode');
                imgElement.classList.remove('darkMode');
        
            }
            else{
                imgElement.src = 'img/moon.png';
                imgElement.alt = 'darkMode';
                imgElement.classList.add('darkMode');
                imgElement.classList.remove('lightMode');
            }
            isLight = !isLight;
            localStorage.setItem('isLight', JSON.stringify(!isLight));
        }, 100);
    }
    lightThingDiv.appendChild(imgElement);
    toggleMode();
    imgElement.addEventListener('click', toggleMode);
}
window.addEventListener('load', toggleLightMode);
