async function responseApi(callback, code) {
    if (typeof code != "undefined") {
        response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`);
    } else if (window.location.search == "" || window.location.search == "?region=all") {
        response = await fetch("https://restcountries.com/v3.1/all");
    } else if (window.location.search == "?region=africa" || window.location.search == "?region=asia" || window.location.search == "?region=america" || window.location.search == "?region=europe" || window.location.search == "?region=oceania") {
        response = await fetch(`https://restcountries.com/v3.1/region/${window.location.search.split("=")[1]}`);
    } else if (window.location.search.split("=")[0] == "?country") {
        response = await fetch(`https://restcountries.com/v3.1/name/${window.location.search.split("=")[1]}?fullText=true`);
    }

    const json = await response.json();
    callback(json);
}