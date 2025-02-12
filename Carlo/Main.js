document.addEventListener('DOMContentLoaded', () => {
    const neinBtn = document.querySelector('.nein-btn');
    const buttonsContainer = document.querySelector('.buttons-container');
    const overlay = document.querySelector('.overlay');
    let clickCount = 0;

    // Referenz-Button für Größenberechnung (statischer "Ja"-Button)
    const referenceBtn = document.querySelector('.nein-btn');

    // Damit die Buttons mit transform: translate(-50%, -50%) vollständig im Sichtbereich bleiben,
    // berechnen wir zufällige Positionen so, dass der Button nicht über den Rand hinausgeht.
    const getRandomPosition = () => {
      const btnStyle = getComputedStyle(referenceBtn);
      const containerStyle = getComputedStyle(buttonsContainer);

      let btnX = parseInt(btnStyle.getPropertyValue("width"), 10);
      let btnY = parseInt(btnStyle.getPropertyValue("height"), 10);

      let containerX = parseInt(containerStyle.getPropertyValue("height"), 10);
      let containerY = parseInt(containerStyle.getPropertyValue("width"), 10);

      return {
        x: Math.random() * 100 - (btnX * 100 / containerX),
        y: Math.random() * 100 - (btnY * 100 / containerY)
      };
      
      // return {
      //   x: btnWidth / 2 + Math.random() * (window.innerWidth - btnWidth),
      //   y: btnHeight / 2 + Math.random() * (window.innerHeight - btnHeight)
      // };
    };

    const moveButton = (btn) => {
      const newPos = getRandomPosition();
      btn.style.left = `${newPos.x}%`;
      btn.style.top = `${newPos.y}%`;
    };

    const spawnJaButtons = () => {
      // Basiszahl der neuen Buttons steigt mit der Anzahl der Klicks, max. 8 Basisbuttons
      const baseCount = Math.min(2 + clickCount, 8);
      const newButtons = Math.floor(baseCount * 1.3);

      for (let i = 0; i < newButtons; i++) {
        const jaBtn = document.createElement('button');
        jaBtn.className = 'btn ja-btn';
        jaBtn.textContent = 'Ja';

        // Positionierung: Setze die Mitte des Buttons auf eine zufällige Position,
        // die so berechnet wird, dass der Button vollständig im Fenster bleibt.
        const newPos = getRandomPosition();
        jaBtn.style.left = `${newPos.x}%`;
        jaBtn.style.top = `${newPos.y}%`;

        // Bloom-Animation beim Erscheinen
        jaBtn.style.animation = 'bloom 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';

        // Klick-Event: Zeige Herz-Animation und anschließend das Overlay
        jaBtn.addEventListener('click', (e) => {
          const heart = document.createElement('div');
          heart.className = 'heart-animation';
          heart.innerHTML = '❤️';
          heart.style.left = `${e.clientX}%`;
          heart.style.top = `${e.clientY}%`;
          document.body.appendChild(heart);

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

    // Beim Überfahren oder Klicken des Nein-Buttons verschieben wir ihn und spawnen neue Ja-Buttons.
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