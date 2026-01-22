// --- Persistent game state ---
let cookies        = Number(localStorage.getItem("cookies")) || 0;
let ovens          = Number(localStorage.getItem("ovens")) || 0;
let mixers         = Number(localStorage.getItem("mixers")) || 0;
let factories      = Number(localStorage.getItem("factories")) || 0;
let achievements   = JSON.parse(localStorage.getItem("achievements") || "[]");

// Dynamic costs (stored so they scale)
let ovenCost    = Number(localStorage.getItem("ovenCost")) || 10;
let mixerCost   = Number(localStorage.getItem("mixerCost")) || 50;
let factoryCost = Number(localStorage.getItem("factoryCost")) || 200;

const COST_MULTIPLIER = 1.15;

// --- Elements ---
const cookieCount   = document.getElementById("cookie-count");
const ovenCount     = document.getElementById("oven-count");
const mixerCount    = document.getElementById("mixer-count");
const factoryCount  = document.getElementById("factory-count");
const cpcSpan       = document.getElementById("cpc");
const cpsSpan       = document.getElementById("cps");

const cookieBtn     = document.getElementById("cookie-btn");
const buyOvenBtn    = document.getElementById("buy-oven-btn");
const buyMixerBtn   = document.getElementById("buy-mixer-btn");
const buyFactoryBtn = document.getElementById("buy-factory-btn");

const ovenCostSpan    = document.getElementById("oven-cost");
const mixerCostSpan   = document.getElementById("mixer-cost");
const factoryCostSpan = document.getElementById("factory-cost");

const resetBtn      = document.getElementById("reset-btn");
const fillBtn       = document.getElementById("fill-btn");
const prestigeBtn   = document.getElementById("prestige-btn");

const floatingText  = document.getElementById("floating-text");
const achievementList = document.getElementById("achievement-list");

// --- Helpers ---
function getCPC() {
  return 1 + ovens * 1 + mixers * 5;
}

function getCPS() {
  return factories * 20;
}

function formatNumber(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return Math.floor(n).toString();
}

// --- Achievements ---
const ACHIEVEMENT_DEFS = [
  { id: "100_cookies", label: "Baker", condition: () => cookies >= 100 },
  { id: "1k_cookies", label: "Industrialist", condition: () => cookies >= 1000 },
  { id: "10_ovens", label: "Oven Tycoon", condition: () => ovens >= 10 },
  { id: "5_factories", label: "Factory Baron", condition: () => factories >= 5 }
];

function unlockAchievements() {
  let changed = false;
  ACHIEVEMENT_DEFS.forEach(a => {
    if (!achievements.includes(a.id) && a.condition()) {
      achievements.push(a.id);
      changed = true;
      addAchievementToUI(a.label);
      showFloatingText(`Achievement: ${a.label} 🏆`);
    }
  });
  if (changed) {
    localStorage.setItem("achievements", JSON.stringify(achievements));
  }
}

function renderAchievements() {
  achievementList.innerHTML = "";
  ACHIEVEMENT_DEFS.forEach(a => {
    if (achievements.includes(a.id)) {
      addAchievementToUI(a.label);
    }
  });
}

function addAchievementToUI(label) {
  const li = document.createElement("li");
  li.textContent = label;
  achievementList.appendChild(li);
}

// --- UI update ---
function updateUI() {
  cookieCount.textContent = formatNumber(cookies);
  ovenCount.textContent = ovens;
  mixerCount.textContent = mixers;
  factoryCount.textContent = factories;
  cpcSpan.textContent = formatNumber(getCPC());
  cpsSpan.textContent = formatNumber(getCPS());

  ovenCostSpan.textContent = formatNumber(ovenCost);
  mixerCostSpan.textContent = formatNumber(mixerCost);
  factoryCostSpan.textContent = formatNumber(factoryCost);

  buyOvenBtn.disabled = cookies < ovenCost;
  buyMixerBtn.disabled = cookies < mixerCost;
  buyFactoryBtn.disabled = cookies < factoryCost;

  // Persist state
  localStorage.setItem("cookies", cookies);
  localStorage.setItem("ovens", ovens);
  localStorage.setItem("mixers", mixers);
  localStorage.setItem("factories", factories);
  localStorage.setItem("ovenCost", ovenCost);
  localStorage.setItem("mixerCost", mixerCost);
  localStorage.setItem("factoryCost", factoryCost);
}

function showFloatingText(text) {
  const span = document.createElement("span");
  span.textContent = text;
  floatingText.appendChild(span);
  setTimeout(() => span.remove(), 800);
}

// --- Core actions ---
cookieBtn.addEventListener("click", () => {
  const earned = getCPC();
  cookies += earned;
  showFloatingText(`+${formatNumber(earned)}`);
  unlockAchievements();
  updateUI();
});

function buyBuilding(kind) {
  if (kind === "oven" && cookies >= ovenCost) {
    cookies -= ovenCost;
    ovens++;
    ovenCost = Math.ceil(ovenCost * COST_MULTIPLIER);
  }
  if (kind === "mixer" && cookies >= mixerCost) {
    cookies -= mixerCost;
    mixers++;
    mixerCost = Math.ceil(mixerCost * COST_MULTIPLIER);
  }
  if (kind === "factory" && cookies >= factoryCost) {
    cookies -= factoryCost;
    factories++;
    factoryCost = Math.ceil(factoryCost * COST_MULTIPLIER);
  }
  unlockAchievements();
  updateUI();
}

buyOvenBtn.addEventListener("click", () => buyBuilding("oven"));
buyMixerBtn.addEventListener("click", () => buyBuilding("mixer"));
buyFactoryBtn.addEventListener("click", () => buyBuilding("factory"));

// --- Idle income loop ---
setInterval(() => {
  const inc = getCPS() / 10; // update 10 times per second for smoother gain
  if (inc > 0) {
    cookies += inc;
    updateUI();
  }
}, 100);

// --- Demo controls ---
fillBtn.addEventListener("click", () => {
  cookies += 100;
  updateUI();
});

resetBtn.addEventListener("click", () => {
  if (!confirm("This will erase your local progress. Continue?")) return;
  cookies = 0;
  ovens = 0;
  mixers = 0;
  factories = 0;
  ovenCost = 10;
  mixerCost = 50;
  factoryCost = 200;
  achievements = [];
  localStorage.clear();
  updateUI();
  renderAchievements();
});

// Prestige button (stubbed for now)
prestigeBtn.addEventListener("click", () => {
  alert("Prestige system coming soon!");
});

// --- Init ---
renderAchievements();
updateUI();
