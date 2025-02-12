document.addEventListener('DOMContentLoaded', () =>
{
    const mainPage = document.querySelector('.mainPage');
    const overlayPage = document.querySelector('.overlayPage');

    const btnContainer = document.querySelector('.buttons-container');

    const jaBtn = document.querySelector('.ja');
    const neinBtn = document.querySelector('.nein');
    const fakeBtn = document.querySelector('.fake');

    let clickCount = 0;

    //#region Init

    //Nein Button Position
    const fakeRect = fakeBtn.getBoundingClientRect();

    const percentLeft = (fakeRect.left / window.innerWidth) * 100;
    const percentTop = (fakeRect.top / window.innerHeight) * 100;

    neinBtn.style.top = `${percentTop}%`
    neinBtn.style.left = `${percentLeft}%`

    //Spawn Animations
    jaBtn.style.animation = 'bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
    neinBtn.style.animation = 'bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';

    //#endregion

    //#region EventListeners

    //erstem Button Heart Animation geben
    jaBtn.addEventListener('click', (e) =>
    {
        // Herzanimation erstellen
        const heart = document.createElement('div');
        heart.className = 'heart-animation';
        heart.innerHTML = '❤️';
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.body.appendChild(heart);
        
        // Overlay nach Animation anzeigen
        setTimeout(() => {
            showOverlay(true);
            heart.remove();
        }, 500);
    });

    neinBtn.addEventListener('mouseover', () =>
    {
        moveNeinButton();
        spawnJaButtons();
    });

    neinBtn.addEventListener('click', (e) =>
    {
        e.preventDefault();
        moveNeinButton();
        spawnJaButtons();
    });

    //#endregion

    //#region Methods

    const showOverlay = (show) =>
    {
        if(show)
        {
            mainPage.style.display = 'none';
            overlayPage.style.display = 'flex';
        }
        else
        {
            overlayPage.style.display = 'none';
            mainPage.style.display = 'flex';
        }
    };

    const moveNeinButton = () =>
    {
        const newPos = getRandomPosition(neinBtn);

        neinBtn.style.left = `${newPos.x}%`;
        neinBtn.style.top = `${newPos.y}%`;
    };

    const spawnJaButtons = () =>
    {
        const baseCount = Math.min(2 + clickCount, 8);
        const newButtons = Math.floor(baseCount * 1.3);
        
        for (let i = 0; i < newButtons; i++) {
            const newJaBtn = document.createElement('button');
            newJaBtn.className = 'button ja';
            newJaBtn.textContent = 'Ja';
            
            // Positionierung
            const newPos = getRandomPosition(jaBtn);
            newJaBtn.style.left = `${newPos.x}%`;
            newJaBtn.style.top = `${newPos.y}%`;

            newJaBtn.style.position = 'absolute';
    
            // Bloom-Animation
            newJaBtn.style.animation = 'bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            
            // Klick-Event mit Animation
            newJaBtn.addEventListener('click', (e) => {
                // Herzanimation erstellen
                const heart = document.createElement('div');
                heart.className = 'heart-animation';
                heart.innerHTML = '❤️';
                heart.style.left = `${e.clientX}px`;
                heart.style.top = `${e.clientY}px`;
                document.body.appendChild(heart);
                
                // Overlay nach Animation anzeigen
                setTimeout(() => {
                    showOverlay(true);
                    heart.remove();
                }, 500);
            });
    
            btnContainer.appendChild(newJaBtn);
        }
        clickCount++;
    };

    const getRandomPosition = (btn) =>
    {
        const style = getComputedStyle(btnContainer);
        const styleBtn = getComputedStyle(btn);

        let xSize  = parseFloat(styleBtn.getPropertyValue('width')) * 100 / parseFloat(style.getPropertyValue('width'));
        let ySize = parseFloat(styleBtn.getPropertyValue('height')) * 100 / parseFloat(style.getPropertyValue('height'));

        return {
            // für neinButton
            // x: clamp(xSize * 0.5, 100 - xSize * 0.5, Math.random() * 100),
            // y: clamp(ySize * 0.5, 100 - ySize * 0.5, Math.random() * 100)
            x: clamp(0, 100 - xSize, Math.random() * 100),
            y: clamp(0, 100 - ySize, Math.random() * 100),
        };
    };

    //#region Math.clamp

    const max = (a, b) => {
        if (a >= b)
            return a;
        return b;
    };
    const min = (a, b) => {
        if (a <= b)
            return a;
        return b;
    };
    const clamp = (minV, maxV, value) => {
        return max(minV, min(value, maxV));
    };

    //#endregion

    //#endregion
});