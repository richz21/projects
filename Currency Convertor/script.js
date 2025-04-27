let to = document.querySelector(".to");
let from = document.querySelector(".from");

let toSelect = to.querySelector("select");
let fromSelect = from.querySelector("select");

let toInput = to.querySelector("input");
let fromInput = from.querySelector("input");

let rate = 0;

console.log("to:", to);
console.log("toSelect:", toSelect);

toSelect.addEventListener("change", () => {
  console.log("toSelect:", toSelect.value);
  getCurrencyJsonDetails(to, toSelect.value);
});
fromSelect.addEventListener("change", () => {
  console.log("fromSelect:", fromSelect.value);
  getCurrencyJsonDetails(from, fromSelect.value);
});

toInput.addEventListener("input", () => {
  fromInput.value = (toInput.value / rate).toFixed(2);
});
fromInput.addEventListener("input", () => {
  toInput.value = (fromInput.value / rate).toFixed(2);
});

// Function to load currency data from JSON file and update details
async function getCurrencyJsonDetails(selection, currencySelected) {
  try {
    const response = await fetch("./currency.json");
    const data = await response.json();

    // Set flag image
    let flag = selection.querySelector(".flag-img");
    flag.innerHTML = `<img src="https://flagicons.lipis.dev/flags/4x3/${data[currencySelected]?.flagcode}.svg"></img>`;

    // Set symbol
    let symbol = selection.querySelector(".currency");
    symbol.innerHTML = `${data[currencySelected]?.symbol}`;

    // Set facts
    let fact = document.querySelector(`#${selection.className}-fact`);
    console.log("Fact select:", fact);
    fact.innerHTML = `${
      data[currencySelected]?.facts[Math.floor(Math.random() * 5)]
    }`;

    // Set input fields
    if (toSelect.value != "CUR" && fromSelect.value != "CUR") {
      toInput.disabled = false;
      fromInput.disabled = false;

      // Fetch the exchange rate asynchronously
      rate = await getExchangeRate(fromSelect.value, toSelect.value);

      document.querySelector("#msg").innerHTML = `1 ${
        data[fromSelect.value]?.name
      } = ${rate} ${data[toSelect.value]?.name_plural}`;
    }
  } catch (error) {
    console.error("Failed to fetch currency.json data:", error);
  }
}

// Function to get Exchange rate from API
async function getExchangeRate(fromCurrency, toCurrency) {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.toLowerCase()}.json`
    );
    const jsonData = await response.json();
    const rate = jsonData[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    console.log(`Exchange rate from ${fromCurrency} to ${toCurrency}: ${rate}`);

    return rate;
  } catch (error) {
    console.error("Failed to fetch exchange rate:", error);
    return null; // Return null in case of an error
  }
}
