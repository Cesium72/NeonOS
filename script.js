let nextZ = 1;
let nextWin = 1;
let activeNote = "";
let apps = {};
let dragging = 0;
let barVis = true;
let notes = {
    "Hello": "Hello, world!",
    "Cake Recipe": `
Ingredients: one cake

Directions: slice and serve
    `
}

function bartog() {
    document.querySelector("header").style.display = barVis ? "none" : "block";
    barVis = !barVis;
    document.getElementById("bartog").textContent = barVis ? "on" : "off";
}

function scheme() {
    let val = parseInt(document.getElementById("scheme").value);
    document.body.style.setProperty("--accent", `hsl(${isNaN(val) ? 115 : val % 360}, 100%, 50%)`)
}

for(var i = 0; i < 240; i++) {
    document.getElementById("bg").innerHTML += "<div></div>"
}

setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
}, 300);

setInterval(() => {
    let now = new Date();
    document.getElementById("time").textContent = `${now.getDate()} ${["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][now.getMonth()]} ${now.getYear() + 1900} | ${now.toLocaleTimeString('en-US')}`
}, 1000);

function launch(app) {
    document.getElementById(app).style.display = "block";
    surface(app);
    nextWin++;
    nextZ++;
}

function startDrag(app) {
    dragging = app;
}

function surface(app) {
    document.getElementById(app).style.zIndex = nextZ;
    nextZ++;
}

function Close(app) {
    document.getElementById(app).style.display = "none";
}

function loadNotes() {
    let ul = document.querySelector("ul");
    ul.innerHTML = "";
    for(i in notes) {
        ul.innerHTML += `<li onclick="note('${i}')">${i}</li>`;
    }
}

loadNotes();

function exit() {
    document.getElementById("open").style.display = "block";
    document.getElementById("edit").style.display = "none";
    notes[activeNote] = document.querySelector("textarea").value;
    loadNotes();
}

function note(name) {
    document.querySelector("textarea").value = notes[name];
    document.getElementById("open").style.display = "none";
    document.getElementById("edit").style.display = "block";
    activeNote = name;
}

function create() {
    let name = prompt("Name of this note?")
    if(name in notes) return;
    notes[name] = `New note: ` + name;
    note(name);
}

document.addEventListener("mousemove", (e) => {
    if(dragging == 0) return;
    let el = document.getElementById(dragging);
    el.style.left = parseFloat(el.style.left) + e.movementX + "px";
    el.style.top = parseFloat(el.style.top) + e.movementY + "px";
});

document.addEventListener("mouseup", () => {dragging = 0});