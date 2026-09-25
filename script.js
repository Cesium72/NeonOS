for(var i = 0; i < 240; i++) {
    document.getElementById("bg").innerHTML += "<div></div>"
}

setTimeout(() => {
    document.getElementById("splash").style.display = "none";
    document.getElementById("main").style.display = "block";
}, 3000);