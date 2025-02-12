document.addEventListener('DOMContentLoaded', () => {
    const neinBtn = document.querySelector('.nein-btn');
    const buttonsContainer = document.querySelector('.buttons-container');
    const overlay = document.querySelector('.overlay');
    let clickCount = 0;

    // Initialposition des Nein-Buttons
    let isFirstInteraction = true;
    const initialNeinBtnPosition = {
        x: neinBtn.offsetLeft,
        y: neinBtn.offsetTop
    };

    const getValidPosition = (element) => {
        const rect = element.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - 20;
        const maxY = window.innerHeight - rect.height - 20;
        return {
            x: Math.max(20, Math.random() * maxX),
            y: Math.max(20, Math.random() * maxY)
        };
    };

    const moveButton = (btn) => {
        if (isFirstInteraction) {
            // Zurücksetzen der ursprünglichen Position
            btn.style.left = `${initialNeinBtnPosition.x}px`;
            btn.style.top = `${initialNeinBtnPosition.y}px`;
            isFirstInteraction = false;
        }
        
        const newPos = getValidPosition(btn);
        btn.style.left = `${newPos.x}px`;
        btn.style.top = `${newPos.y}px`;
    };

    const spawnJaButtons = () => {
        const baseCount = Math.min(2 + clickCount, 8);
        const newButtons = Math.floor(baseCount * 1.3);
        
        for (let i = 0; i < newButtons; i++) {
            const jaBtn = document.createElement('button');
            jaBtn.className = 'btn ja-btn';
            jaBtn.textContent = 'Ja';
            
            // Temporär hinzufügen für Größenberechnung
            jaBtn.style.visibility = 'hidden';
            document.body.appendChild(jaBtn);
            
            // Validierte Position setzen
            const newPos = getValidPosition(jaBtn);
            jaBtn.style.left = `${newPos.x}px`;
            jaBtn.style.top = `${newPos.y}px`;
            jaBtn.style.visibility = 'visible';
            
            // Animation
            jaBtn.animate([
                { transform: 'scale(0.5)', opacity: 0 },
                { transform: 'scale(1)', opacity: 1 }
            ], {
                duration: 300,
                easing: 'ease-out'
            });

            jaBtn.addEventListener('click', showOverlay);
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