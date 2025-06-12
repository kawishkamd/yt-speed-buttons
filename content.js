(function () {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];
  let buttonsContainer;

  function highlightSelectedButton(selectedSpeed) {
    if (!buttonsContainer) return;
    Array.from(buttonsContainer.children).forEach((button, idx) => {
      const speed = speeds[idx];
      if (speed === selectedSpeed) {
        button.style.backgroundColor = '#1976d2';
        button.style.color = '#fff';
        button.style.border = '2px solid rgb(0, 100, 200)';
      } else {
        button.style.backgroundColor = '#ffffffb3';
        button.style.color = '#000';
        button.style.border = '1px solid #ccc';
      }
    });
  }

  function createSpeedButtons() {
    if (buttonsContainer) return; // Prevent duplicates

    const player = document.querySelector('#below');
    const video = document.querySelector('video');
    if (!player || !video) return;

    buttonsContainer = document.createElement('div');
    Object.assign(buttonsContainer.style, {
      position: 'absolute',
      top: '-20px',
      right: '-200px',
      zIndex: '999',
      display: 'flex',
      flexDirection: 'row',
    });

    speeds.forEach(speed => {
      const button = document.createElement('button');
      button.textContent = `${speed}x`;
      Object.assign(button.style, {
        margin: '1px',
        padding: '1px 3px',
        fontSize: '11px',
        backgroundColor: '#ffffffb3',
        border: '1px solid #ccc',
        borderRadius: '3px',
        cursor: 'pointer',
        width: '35px',
      });

      button.addEventListener('click', () => {
        video.playbackRate = speed;
        highlightSelectedButton(speed);
      });

      buttonsContainer.appendChild(button);
    });

    player.appendChild(buttonsContainer);
    highlightSelectedButton(video.playbackRate);

    video.addEventListener('ratechange', () => {
      highlightSelectedButton(video.playbackRate);
    });
  }

  function checkForPlayer() {
    if (!buttonsContainer) createSpeedButtons();
  }

  function handleFullscreenChange() {
    if (buttonsContainer) {
      buttonsContainer.style.display = document.fullscreenElement ? 'none' : 'flex';
    }
  }

  document.addEventListener('fullscreenchange', handleFullscreenChange);

  const observer = new MutationObserver(checkForPlayer);
  observer.observe(document.body, { childList: true, subtree: true });

  checkForPlayer(); // Initial run
})();
