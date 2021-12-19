let arrListCountries = [];

if (arrListCountries.length > 0) {
    showCountries(arrListCountries);
} else if (document.getElementById("details") == null) {
    getListCountries();
} else {
    getCountry()

}


// Functions

function getListCountries() {
    getResponseCountries();
}


function getCountry() {
    getResponseCountries();
}

function getContriesRegions() {
    getResponseCountries();
}


function details(id) {
    url = `https://ramonalvesmodesto.github.io/countries-world/?country=${id}`;
    document.location.href = url;
}

function getListCountriesRegions(id) {
    var url = `https://ramonalvesmodesto.github.io/countries-world/?region=${id}`;
    document.location.href = url;

    getContriesRegions();
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

function getResponseCountries() {
    const gcountry = async (callback) => {
        let response;

        if(window.location.search == "" || window.location.search == "?region=all") {
            response = await fetch("https://restcountries.com/v3.1/all");
        } else if(window.location.search == "?region=africa" || window.location.search == "?region=asia" || window.location.search == "?region=america" || window.location.search == "?region=europe" || window.location.search == "?region=oceania") {
            response = await fetch(`https://restcountries.com/v3.1/region/${window.location.search.split("=")[1]}`);
        } else {
            response = await fetch(`https://restcountries.com/v3.1/name/${window.location.search.split("=")[1]}?fullText=true`);
        }

        const json = await response.json();
        
        callback(json);
    }

    gcountry((data) => {
        const countries = data;
        arrListCountries = countries;

        if (countries.length == 1) {
            showCountry(countries);
        } else {
            showCountries(countries);
        }
    });


}

function showCountries(arrListCountries) {
    load("list-countries", "flex");

    for (const country of arrListCountries) {
        document.querySelector(".list-countries").innerHTML +=
            `
            <a class="box" id="${country.name.common.toLowerCase()}" onclick="details(this.id)">
                <div class="box-country">
                    <img src="${country.flags.svg}" alt="" class="flag">
            
                    <div class="content">
                        <h4>${country.translations.por.common}</h4>

                        <ul class="list-information">
                            <li>
                                <p class="key">População: </p>
                                <p class="value">${country.population}</p>
                            </li>
                            <li>
                                <p class="key">Região: </p>
                                <p class="value">${country.region}</p>
                            </li>
                            <li>
                                <p class="key">Capital: </p>
                                <p class="value">${country.capital}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </a>
        `;
    }

    load("list-countries", "flex");
}

function showCountry(country) {
    load("detail-country", "block");
    document.querySelector(".detail-country").innerHTML =
        `
    <a href="../../index.html" class="back-home back-hover">
        <i class="fas fa-arrow-left"></i>
        Voltar
    </a>

    <div class="flag">
        <img src="${country[0].flags.svg}" alt="">

        <div class="informations">
            <h1>${country[0].translations.por.common}</h1>
            <div class="region-information">
                <ul class="list-information">
                    <li>
                        <p class="key">Nome Nativo: </p>
                        <p class="value">${country[0].translations.por.common}</p>
                    </li>
                    <li> 
                        <p class="key">População: </p>
                        <p class="value">${country[0].population}</p>
                    </li>
                    <li> 
                        <p class="key">Região: </p>
                        <p class="value">${country[0].region}</p>
                    </li>
                    <li>
                        <p class="key">Sub Região: </p>
                        <p class="value">${country[0].subregion}</p>
                    </li>
                    <li>
                        <p class="key">Capital: </p>
                        <p class="value">${country[0].capital}</p>
                    </li>
                </ul>

                <ul class="list-information">
                    <li>
                        <p class="key">Domínio:</p>
                        <p class="value">${itarableObj(country[0].demonyms)}</p>
                    </li>
                    <li> 
                        <p class="key">Moeda: </p>
                        <p class="value">${itarableObj(country[0].currencies)}</p>
                    </li>
                    <li> 
                        <p class="key">Idiomas:</p>
                        <p class="value">${itarableObj(country[0].languages)}</p>
                    </li>
                </ul>
            </div>

            <div class="border-countries">
                <p>Border Countries: </p>
                <ul class="list-information">
                    <li>
                        <a href="#">Colocar aqui</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;
    load("detail-country", "block");

}

function load(string1, string2) {
    var div = document.querySelector(`.${string1}`);
    var load = document.querySelector(".load");

    if (load.style.display == "none") {
        load.style.display = "none";
        div.style.display = string2;
    } else {
        load.style.display = "none";
        div.style.display = string2;
    }
}

function itarableObj(obj) {
    let value = "";
    Object.entries(obj).map(entry => {
        if (typeof entry[1] === "object") {
            Object.entries(entry[1]).map(entry1 => {
                value += entry1[1].toString() + ", ";
            });
        } else {
            value += entry[1].toString() + ", ";
        }

    });

    return value.substring(value.length - 2, 0);
}

function findCountry() {
    let arr = [];
    setTimeout(() => {
        for (const iterator of arrListCountries) {
            if (subStringIgual(input.value, iterator.translations.por.common) != "") {
                arr.push(iterator);
            }
        }

        document.querySelector(".main").removeChild(document.querySelector(".list-countries"));
        document.querySelector(".main").innerHTML = `<div class="list-countries"></div>`;
        showCountries(arr);
    }, 0);
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

// Event Listeners

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

function lightMode() {
    alert("aqui")
}

