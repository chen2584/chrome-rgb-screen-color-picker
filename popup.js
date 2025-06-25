const colorDisplay = document.getElementById('color-display');
const hexInput = document.getElementById('hex-input');
const eyedropperBtn = document.getElementById('eyedropper-btn');
const copyBtn = document.getElementById('copy-btn');

hexInput.addEventListener('input', () => {
  const hex = hexInput.value;
  console.log(hex)
  if (/^#[0-9A-F]{6}$/i.test(hex)) {
    updateHexInput(hex);
    colorDisplay.style.backgroundColor = hex;
  }
});

const eyeDropper = new EyeDropper();
eyedropperBtn.addEventListener('click', () => {
  console.log("initial")
  eyeDropper.open().then(result => {
    if (result.sRGBHex) {
      const hex = result.sRGBHex;
      colorDisplay.style.backgroundColor = hex;
      updateHexInput(hex);
    }
  }).catch(err => {
    console.error(err);
  });
});

function updateHexInput(hex) {
  hexInput.value = hex;
  hexInput.placeholder = hex;
}