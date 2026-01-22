// Game State
// --------------------
let cookies = Number(localStorage.getItem("cookies")) || 0;
let ovens = Number(localStorage.getItem("ovens")) || 0;
let mixers = Number(localStorage.getItem("mixers")) || 0;
let factories = Number(localStorage.getItem("factories")) || 0;

const ovenCost = 10;
const mixerCost = 50;
const factoryCost = 200;

// --------------------
// Elements
// --------------------
const cookieCount = document.getElementById("cookie-count");
const ovenCount = document.getElementById("oven-count");
const mixerCount = document.getElementById("mixer-count");
const factoryCount = document.getElementById("factory-count");

const cookieBtn = document.getElementById("cookie-btn");
const buyOvenBtn = document.getElementById("buy-oven-btn");
const buyMixerBtn = document.getElementById("buy-mixer-btn");
const buyFactoryBtn = document.getElementById("buy-factory-btn");

const resetBtn = document.getElementById("reset-btn");
const fillBtn = document.getElementById("fill-btn");

const floatingText = document.getElementById("floating-text");

// --------------------
// Update UI
// --------------------
function updateUI() {
  cookieCount.textContent = cookies;
  ovenCount.textContent = ovens;
  mixerCount.textContent = mixers;
  factoryCount.textContent = factories;

  buyOvenBtn.disabled = cookies < ovenCost;
  buyMixerBtn.disabled = cookies < mixerCost;
  buyFactoryBtn.disabled = cookies < factoryCost;

  localStorage.setItem("cookies", cookies);
  localStorage.setItem("ovens", ovens);
  localStorage.setItem("mixers", mixers);
  localStorage.setItem("factories", factories);
}

// --------------------
// Floating Text
// --------------------
function showFloatingText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  floatingText.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

// --------------------
// Actions
// --------------------
cookieBtn.addEventListener("click", () => {
  const earned = 1 + ovens + mixers * 5 + factories * 20;
  cookies += earned;
  showFloatingText(`+${earned}`);
  updateUI();
});

buyOvenBtn.addEventListener("click", () => {
  if (cookies >= ovenCost) {
    cookies -= ovenCost;
    ovens++;
    updateUI();
  }
});

buyMixerBtn.addEventListener("click", () => {
  if (cookies >= mixerCost) {
    cookies -= mixerCost;
    mixers++;
    updateUI();
  }
});

buyFactoryBtn.addEventListener("click", () => {
  if (cookies >= factoryCost) {
    cookies -= factoryCost;
    factories++;
    updateUI();
  }
});

// --------------------
// Demo Controls
// --------------------
fillBtn.addEventListener("click", () => {
  cookies += 100;
  updateUI();
});

resetBtn.addEventListener("click", () => {
  cookies = 0;
  ovens = 0;
  mixers = 0;
  factories = 0;
  localStorage.clear();
  updateUI();
});

// --------------------
// Start
// --------------------
updateUI();
