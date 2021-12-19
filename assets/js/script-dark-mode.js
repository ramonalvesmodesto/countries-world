function lightMode() {
    if (document.querySelector(".icon span").textContent == "Dark Mode") {
        document.querySelector(".icon span").textContent = "Ligth Mode";
        document.querySelector(".fa-moon").style.fontWeight = "900";
        document.documentElement.style.setProperty("--background", "#202D36");
        document.documentElement.style.setProperty("--background-element", "#2B3743");
        document.documentElement.style.setProperty("--general-font", "#D1D1D1");
        document.documentElement.style.setProperty("--icon", "#D1D1D1");
        document.documentElement.style.setProperty("--shadow", "#1515155d");
        document.documentElement.style.setProperty("--color-white", "#2B3743");
    } else {
        document.querySelector(".icon span").textContent = "Dark Mode";
        document.querySelector(".fa-moon").style.fontWeight = "400";
        document.documentElement.style.setProperty("--background", "#FAFAFA");
        document.documentElement.style.setProperty("--background-element", "#FFF");
        document.documentElement.style.setProperty("--general-font", "rgb(58, 58, 58)");
        document.documentElement.style.setProperty("--icon", "#555");
        document.documentElement.style.setProperty("--shadow", "rgba(153, 153, 153, 0.254)");
        document.documentElement.style.setProperty("--color-white", "#FFF");
    }

}