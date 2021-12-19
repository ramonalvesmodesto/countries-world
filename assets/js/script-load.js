function load(state) {
    if (state == "start") {
        document.querySelector(".load").style.display = "block";
    } else {
        document.querySelector(".load").style.display = "none";
    }
}