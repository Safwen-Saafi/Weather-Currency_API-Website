const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getEquation = document.querySelector(".wrapper1 form button"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "TND" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; // temporary currency code of FROM drop list
    fromCurrency.value = toCurrency.value; // passing TO currency code to FROM currency code
    toCurrency.value = tempCode; // passing temporary currency code to TO currency code
    loadFlag(fromCurrency); // calling loadFlag with passing select element (fromCurrency) of FROM
    loadFlag(toCurrency); // calling loadFlag with passing select element (toCurrency) of TO
    getExchangeRate(); // calling getExchangeRate
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // if user don't enter any value or enter 0 then we'll put 1 value by default in the input field
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/"Your API key"/latest/${fromCurrency.value}`;
    // fetching api response and returning it with parsing into js obj and in another then method receiving that obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]; // getting user selected TO currency rate
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplying user entered value with selected TO currency rate
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ // if user is offline or any other error occured while fetching data then catch function will run
        exchangeRateTxt.innerText = "Something went wrong";
    });
}




getEquation.addEventListener("click", e =>{
    e.preventDefault(); //preventing form from submitting
    equation();
});

window.addEventListener("load", () =>{
    equation();
});

function equation(){
    const amount1 = document.querySelector(".amount1 input")
    resultato1Txt = document.querySelector(".txt-2")
    resultatoTxt = document.querySelector(".txt-1");
    let entre = amount1.value;
    if(entre == "" || entre == "0"){
        amount1.value = "1";
        entre = 1;
    }
    resultatoTxt.innerText= "Getting your result...";
    let url = `https://v6.exchangerate-api.com/v6/88b244bb6dbec718d16e961d/latest/${fromCurrency.value}`;
    fetch(url).then(response => response.json()).then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value];
        let resultato = (entre * exchangeRate).toFixed(2);    
        resultatoTxt.innerText = `${fromCurrency.value} * ${exchangeRate} = ${resultato} ${toCurrency.value}`;
    })

    const amount2 = document.querySelector(".amount2 input");
    let entre2 = amount2.value;
    if(entre2 == "" || entre2 == "0"){
        amount2.value = "1";
        entre2 = 1;
    }
    resultato1Txt.innerText= "Getting your result...";
    let url2 = `https://v6.exchangerate-api.com/v6/88b244bb6dbec718d16e961d/latest/${toCurrency.value}`;
    fetch(url2).then(response2 => response2.json()).then(result1 => {
        let exchangeRate1 = result1.conversion_rates[fromCurrency.value];
        let resultato1 = (entre2 * exchangeRate1).toFixed(2);
        resultato1Txt.innerText = `${toCurrency.value} * ${exchangeRate1} = ${resultato1} ${fromCurrency.value}`;
    })
}







