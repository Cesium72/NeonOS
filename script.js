const windows = {
    "help": `
        <h2>Help</h2>
        <p>This is NeonOS! It's not actually an OS, but
        it's designed to emulate one. It's very feature
        limited, so it doesn't quite do this, but I had
        fun making it.<br/><br/>
        Apps can be opened from the bottom bar, click on
        them to see what they do. Have fun!</p>
    `
}

let nextZ = 1;
let nextWin = 1;
let apps = {};
let dragging = 0;

for(var i = 0; i < 240; i++) {
    document.getElementById("bg").innerHTML += "<div></div>"
}

setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
}, 3000);

setInterval(() => {
    let now = new Date();
    document.getElementById("time").textContent = `${now.getDate()} ${["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()]} ${now.getYear() + 1900} | ${now.toLocaleTimeString('en-US')}`
}, 1000);

function launch(app) {
    document.getElementById("main").innerHTML += `
        <div class="window"id="window${nextWin}"style="z-index:${nextZ};">
        <div class="header"></div>
            ${windows[app]}
        </div>
    `;
    document.querySelector(`#window${nextWin}`).addEventListener("mousedown", eval(`(e) => {dragging = ${nextWin};}`));
    nextWin++;
    nextZ++;
}

document.addEventListener("mousemove", (e) => {
    if(dragging == 0) return;
    let el = document.getElementById("window" + dragging);
    el.style.left = parseFloat(el.style.left) + e.movementX;
    el.style.top = parseFloat(el.style.top) + e.movementY;
});

document.addEventListener("mouseup", () => {dragging = 0});