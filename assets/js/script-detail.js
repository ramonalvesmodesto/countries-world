responseApi((data) => {
    const countries = data;
    arrListCountries = countries;

    showCountry(countries);

});

function showCountry(country) {
    var getUrl = document.location.href.toString();
    getUrl = getUrl.replace("details.html", "index.html");
    getUrl = getUrl.replace(getUrl.substring(getUrl.length, getUrl.indexOf("?")), "/countries-world/index.html");

    load("start");
    document.querySelector(".detail-country").innerHTML +=
        `
    <a href="/countries-world/index.html" class="back-home back-hover">
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
                <ul class="list-information borders">
                    
                </ul>
            </div>
        </div>
    </div>
    `;

    listBordersCountries(country[0].borders);
    load("stop");

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

function listBordersCountries(list) {
    if (typeof list == "undefined") {
        document.querySelector(".borders").innerHTML +=
            `
            <li>
                <a href="/index.html">Não encontrado</a>
            </li>
            `
    } else {
        for (const iterator of list) {
            responseApi((n) => {
                let url = document.location.href.toString();

                document.querySelector(".borders").innerHTML +=
                    `
                <li>
                    <a href="${url.replace(url.substring(url.indexOf("="), url.length), "=" + n[0].name.common.toLowerCase())}">${n[0].name.common}</a>
                </li>
                `
            }, iterator);
        }
    }
}