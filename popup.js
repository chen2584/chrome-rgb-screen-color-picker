const colorDisplay = document.getElementById('color-display');
const hexInput = document.getElementById('hex-input');
const eyedropperBtn = document.getElementById('eyedropper-btn');
const copyBtn = document.getElementById('copy-btn');
const recentColorsContainer = document.getElementById('recent-colors');
const recentsHeader = document.getElementById('recents-header');

const MAX_RECENT_COLORS = 6;
let recentColors = [];

function setMainColor(hex) {
  colorDisplay.style.backgroundColor = hex;
  hexInput.value = hex.toUpperCase();
  validateAndToggleButton();
}

function updateColorAndRecents(hex) {
  setMainColor(hex);
  addRecentColor(hex);
}

function validateAndToggleButton() {
  const hex = hexInput.value;
  const isValid = /^#[0-9A-F]{6}$/i.test(hex);
  copyBtn.disabled = !isValid;
}

function addRecentColor(hex) {
  const normalizedHex = hex.toUpperCase();
  // Check if the color already exists in recents
  if (recentColors.includes(normalizedHex)) {
    return; // Do not update recents if it already exists
  }

  // Add to the beginning
  recentColors.unshift(normalizedHex);

  // Trim to MAX_RECENT_COLORS
  if (recentColors.length > MAX_RECENT_COLORS) {
    recentColors = recentColors.slice(0, MAX_RECENT_COLORS);
  }
  renderRecentColors();
}

function renderRecentColors() {
  recentColorsContainer.innerHTML = '';
  if (recentColors.length > 0) {
    recentsHeader.style.display = 'block';
    recentColors.forEach(hex => {
      const colorBox = document.createElement('div');
      colorBox.classList.add('recent-color-box');
      colorBox.style.backgroundColor = hex;
      colorBox.title = hex;
      colorBox.addEventListener('click', () => {
        setMainColor(hex); // Only set the main color, do not update recents
      });
      recentColorsContainer.appendChild(colorBox);
    });
  } else {
    recentsHeader.style.display = 'none';
  }
}

hexInput.addEventListener('input', () => {
  validateAndToggleButton();
  const hex = hexInput.value;
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    colorDisplay.style.backgroundColor = hex;
    addRecentColor(hex);
  }
});

const eyeDropper = new EyeDropper();
eyedropperBtn.addEventListener('click', () => {
  eyeDropper.open().then(result => {
    if (result && result.sRGBHex) {
      updateColorAndRecents(result.sRGBHex);
    }
  }).catch(err => {
    console.log('EyeDropper closed.');
  });
});

copyBtn.addEventListener('click', () => {
  if (copyBtn.disabled) return;

  navigator.clipboard.writeText(hexInput.value).then(() => {
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
});

// Initial validation and rendering
validateAndToggleButton();
renderRecentColors();