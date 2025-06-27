const colorDisplay = document.getElementById('color-display');
const hexInput = document.getElementById('hex-input');
const eyedropperBtn = document.getElementById('eyedropper-btn');
const copyBtn = document.getElementById('copy-btn');

function updateColor(hex) {
  colorDisplay.style.backgroundColor = hex;
  hexInput.value = hex.toUpperCase();
  validateAndToggleButton();
}

function validateAndToggleButton() {
  const hex = hexInput.value;
  const isValid = /^#[0-9A-F]{6}$/i.test(hex);
  copyBtn.disabled = !isValid;
}

hexInput.addEventListener('input', () => {
  validateAndToggleButton();
  if (/^#[0-9A-F]{6}$/i.test(hexInput.value)) {
    colorDisplay.style.backgroundColor = hexInput.value;
  }
});

const eyeDropper = new EyeDropper();
eyedropperBtn.addEventListener('click', () => {
  eyeDropper.open().then(result => {
    if (result && result.sRGBHex) {
      updateColor(result.sRGBHex);
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

validateAndToggleButton();
