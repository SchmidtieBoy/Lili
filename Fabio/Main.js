document.addEventListener('DOMContentLoaded', () => {
    const neinBtn = document.querySelector('.nein-btn');
    const originJaBtn = document.querySelector('.ja-btn');
    const buttonsContainer = document.querySelector('.buttons-container');
    const overlay = document.querySelector('.overlay');
    let clickCount = 0;
    
    // Referenz-Button für Größenberechnung
    const referenceBtn = document.querySelector('.ja-btn');
    let btnWidth = referenceBtn.offsetWidth;
    let btnHeight = referenceBtn.offsetHeight;

    // Update Button-Größe bei Fensteränderung
    window.addEventListener('resize', () => {
        btnWidth = referenceBtn.offsetWidth;
        btnHeight = referenceBtn.offsetHeight;
    });

    const getRandomPosition = (btn) => {
        const style = getComputedStyle(buttonsContainer);
        const styleBtn = getComputedStyle(btn);
        let ySize = parseFloat(styleBtn.getPropertyValue('height')) * 100 / parseFloat(style.getPropertyValue('height'));
        let xSize  = parseFloat(styleBtn.getPropertyValue('width')) * 100 / parseFloat(style.getPropertyValue('width'));
        return {
            x: clamp(0, 100 - xSize, Math.random() * 100),
            y: clamp(0, 100 - ySize, Math.random() * 100)
        };
        //Math.random()
    };
    const getRandomPositionNo = (btn) => {
        const style = getComputedStyle(buttonsContainer);
        const styleBtn = getComputedStyle(btn);
        let ySize = parseFloat(styleBtn.getPropertyValue('height')) * 100 / parseFloat(style.getPropertyValue('height'));
        let xSize  = parseFloat(styleBtn.getPropertyValue('width')) * 100 / parseFloat(style.getPropertyValue('width'));
        return {
            x: clamp(xSize * 0.5, 100 - xSize * 0.5, Math.random() * 100),
            y: clamp(ySize * 0.5, 100 - ySize * 0.5, Math.random() * 100)
        };
        //Math.random()
    };
    const max = (a, b) => {
        if (a >= b)
            return a;
        return b;
    }
    const min = (a, b) => {
        if (a <= b)
            return a;
        return b;
    }
    const clamp = (minV, maxV, value) => {
        return max(minV, min(value, maxV));
    }

    const moveButton = (btn) => {
        const newPos = getRandomPositionNo(btn);
        btn.style.left = `${newPos.x}%`;
        btn.style.top = `${newPos.y}%`;
    };

    const spawnJaButtons = () => {
        const baseCount = Math.min(2 + clickCount, 8);
        const newButtons = Math.floor(baseCount * 1.3);
        
        for (let i = 0; i < newButtons; i++) {
            const jaBtn = document.createElement('button');
            jaBtn.className = 'btn ja-btn';
            jaBtn.textContent = 'Ja';
            
            // Positionierung
            const newPos = getRandomPosition(originJaBtn);
            jaBtn.style.left = `${newPos.x}%`;
            jaBtn.style.top = `${newPos.y}%`;
    
            // Bloom-Animation
            jaBtn.style.animation = 'bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            
            // Klick-Event mit Animation
            jaBtn.addEventListener('click', (e) => {
                // Herzanimation erstellen
                const heart = document.createElement('div');
                heart.className = 'heart-animation';
                heart.innerHTML = '❤️';
                heart.style.left = `${e.clientX}%`;
                heart.style.top = `${e.clientY}%`;
                document.body.appendChild(heart);
                
                // Overlay nach Animation anzeigen
                setTimeout(() => {
                    showOverlay();
                    heart.remove();
                }, 500);
            });
    
            buttonsContainer.appendChild(jaBtn);
        }
        clickCount++;
    };

    const showOverlay = () => {
        document.querySelector('.container').style.display = 'none';
        overlay.style.display = 'flex';
    };

    neinBtn.addEventListener('mouseover', () => {
        moveButton(neinBtn);
        spawnJaButtons();
    });

    neinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        moveButton(neinBtn);
        spawnJaButtons();
    });
});