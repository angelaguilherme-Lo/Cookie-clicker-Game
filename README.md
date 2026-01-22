🍪 COOKIE CLICKER- Foundry 
· HTML · CSS · JS

A simple Cookie Clicker–style game built with HTML, CSS, and JavaScript, focused on a minimal viable product with clean logic, clear structure, and persistent game state.


FEATURES
Click the cookie to earn cookies.
Buy Oven, Mixer and Factory to increase cookies per click.
The upgrade button disables when you can’t afford it.
Progress is saved using localStorage.
Modern, game-like UI with emoji feedback.
The core mechanic is clicking to earn cookies and buying a single upgrade that increases cookies per click.


HOW THE GAME WORKS

Each click gives 1 cookie plus 1 extra for every Bakery Oven you own.
Each Bakery Oven costs 10 cookies, Mixer costs 50 cookies and the Factory costs 200 cookies.
Cookies and upgrades are saved automatically in the browser.
Reloading the page keeps your progress.
I kept all game state simple and updated the UI from one place to avoid bugs.


PROJECT STRUCTURE

cookie-clicker/
├── index.html   # Game structure
├── style.css    # Styling and layout
└── script.js   # Game logic


TECHNOLOGIES USED

HTML for structure and layout.
CSS for styling and game atmosphere.
JavaScript for game logic and state management.
localStorage to save progress in the browser.
No external libraries or frameworks.
Given the limited time, I focused on a stable MVP (Minimum Viable Product) instead of adding many features.


HOW TO RUN

Download or clone the project.
Open index.html in your browser.
Start clicking the cookie; no installation or setup needed.


PROJECT GOAL

Practice JavaScript fundamentals.
Work with DOM manipulation and events.
Manage simple game state cleanly.
Build and polish an MVP within limited time.
The focus was on clarity, stability, and completeness rather than feature count.

POSSIBLE IMPROVEMENTS

More upgrades and passive cookie generation.
Animations, sound effects, and richer feedback.
Statistics or achievements for longer sessions.
These were intentionally left out to keep the project small and reliable.

