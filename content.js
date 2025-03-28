(function () {
  const speeds = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 3, 4];
  let buttonsContainer;

  function createSpeedButtons() {
    if (buttonsContainer) return; // Prevent duplicate buttons

    // Select the YouTube video player
    const player = document.querySelector('#below');
    if (!player) return;

    // Create a container for the buttons
    buttonsContainer = document.createElement('div');
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '-20px';
    buttonsContainer.style.right = '-200px'; // Shifted bar right to avoid overlapping video title
    buttonsContainer.style.zIndex = '999'; // Lowered z-index (9999 → 999) to keep speed bar below popups
    buttonsContainer.style.display = 'flex';
    buttonsContainer.style.flexDirection = 'row';

    // Create buttons for each speed
    speeds.forEach(speed => {
      const button = document.createElement('button');
      button.textContent = `${speed}x`;
      button.style.margin = '1px';
      button.style.padding = '1px 3px'; // Even smaller padding
      button.style.fontSize = '11px'; // Smaller font size
      button.style.backgroundColor = '#ffffffcc';
      button.style.border = '1px solid #ccc';
      button.style.borderRadius = '3px';
      button.style.cursor = 'pointer';
      button.style.width = '35px'; // Smaller width

      // Set the video playback speed when clicked
      button.addEventListener('click', () => {
        const video = document.querySelector('video');
        if (video) {
          video.playbackRate = speed;
        }
      });

      buttonsContainer.appendChild(button);
    });

    // Append the container to the player
    player.appendChild(buttonsContainer);
  }

  function checkForPlayer() {
    const player = document.querySelector('.html5-video-player');
    if (player && !buttonsContainer) {
      createSpeedButtons();
    }
  }

  // Observe changes in the DOM to handle navigation within YouTube
  const observer = new MutationObserver(() => {
    checkForPlayer();
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Initial check when the script loads
  checkForPlayer();
})();
