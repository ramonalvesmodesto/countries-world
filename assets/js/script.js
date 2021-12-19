let arrListCountries = [];

responseApi((data) => {
    const countries = data;
    arrListCountries = countries;

    showCountries(countries);

});

var input = document.querySelector("#filter");
input.addEventListener("click", showFilterRegion);

var input = document.getElementById("search");
input.addEventListener("keyup", findCountry);

var ul = document.querySelector(".list-region");
ul.addEventListener("click", function (event) {
    var target = event.target;
    getListCountriesRegions(target.getAttribute("id"));
});

var dark = document.querySelector(".icon");
dark.addEventListener("click", lightMode);


function details(id) {
    var getUrl = document.location.href.toString();
    getUrl = getUrl.replace(getUrl.substring(getUrl.length, getUrl.indexOf("?")), "");
    getUrl = getUrl.replace("/index.html", "");

    var url = `${getUrl}/details.html?country=${id}`;
    document.location.href = url;
}

function getListCountriesRegions(id) {
    var getUrl = document.location.href.toString();
    getUrl = getUrl.replace(getUrl.substring(getUrl.length, getUrl.indexOf("?")), "");
    getUrl = getUrl.replace("/countries-world/", "/countries-world/index.html");

    var url = `${getUrl}?region=${id}`;
    document.location.href = url;

    responseApi();
}

function showFilterRegion() {
    var ul = document.querySelector(".list-region");

    if (ul.style.display === "block") {
        ul.style.display = "none";
        document.querySelector(".fa-chevron-down").className = "fa fa-chevron-up";
    } else {
        ul.style.display = "block"
        document.querySelector(".fa-chevron-up").className = "fa fa-chevron-down";
    }
}

function showCountries(arrListCountries) {
    load("start");

    if(window.Worker) {
        const worker = new Worker("assets/js/script-worker-list-countries.js");

        worker.postMessage(arrListCountries);

        worker.onmessage = (e) => {
            document.querySelector(".list-countries").innerHTML = e.data;
        }
    }

    load("stop");
}

function findCountry() {
    let arr = [];
    document.querySelector(".main").removeChild(document.querySelector(".list-countries"));
    document.querySelector(".main").innerHTML = `<div class="list-countries"></div>`;
    load("start");

    setTimeout(function () {
        for (const iterator of arrListCountries) {
            if (subStringIgual(input.value, iterator.translations.por.common) != "") {
                arr.push(iterator);
            }
        }

        showCountries(arr);
        load("stop");
    }, 1000);
}

function subStringIgual(string1, string2) {
    for (var i = 0; i < string2.length; i++) {
        if (string1.length + i > string2.length) {
            return "";
        }
        if (string1.toLowerCase() == string2.substring(string1.length + i, i).toLowerCase()) {
            return string2;
        }
    }

    return "";
}

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

