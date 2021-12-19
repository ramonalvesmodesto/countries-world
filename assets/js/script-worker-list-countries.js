onmessage = function(e) {
    const result = e.data;
    postMessage(concatListCountries(result));
}

function concatListCountries(arrListCountries) {
    let divListCountries = "";
    for (const country of arrListCountries) {
        divListCountries +=
            ` <a class="box" id="${country.name.common.toLowerCase()}" onclick="details(this.id)">
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

    return divListCountries;
}