import axios from "axios";

const baseCurrency = "RUB";
type TCurrencyResults = {
  result: string;
  documentation: string;
  termsOfUse: string;
  timeLastUpdateUnix: number;
  timeLastUpdateUtc: string;
  timeNextUpdateUtc: number;
  baseCode: string;
  conversion_rates: {
    [currency: string]: number;
  };
};

let timerId: number;
let timeout: string | null;
let currensies: string | null;
const currenciesCodes = ["USD", "EUR", "CNY", "UAH", "JPY", "PLN"];
export const filteredRates: { [currency: string]: number } = {};
let result: TCurrencyResults;

// функция сохраняет текущие курсы валют в localStorage
// и время до следующего запроса курсов,
// таким образом при перезагрузке страницы время не сбрасывается

async function getCurrencyRates(baseCurrency: string) {
  const options = {
    method: "GET",
    url: `https://v6.exchangerate-api.com/v6/9b6cc22ae23f084cb7c32b57/latest/${baseCurrency}`,
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

async function updateRates(
  setCurrencyResults: (rates: { [currency: string]: number }) => void
) {
  try {
    result = await getCurrencyRates(baseCurrency);
    // Result - результат выполнения запроса
    console.log(result);
    localStorage.setItem("currencies", JSON.stringify(result));

    processRates(result, setCurrencyResults);
  } catch (error) {
    console.error(error);
  }
  timerId = setTimeout(updateRates, 15 * 60 * 1000);
  localStorage.setItem(
    "timeout",
    String(new Date().getTime() + 15 * 60 * 1000)
  );
}
export function init(
  setCurrencyResults: (rates: { [currency: string]: number }) => void
) {
  timeout = localStorage.getItem("timeout");
  currensies = localStorage.getItem("currencies");
  console.log("1.", { timeout, currensies });

  if (currensies == "[]" || !currensies) {
    updateRates(setCurrencyResults);
  }

  if (currensies && new Date().getTime() < Number(timeout)) {
    clearTimeout(timerId);
    const remainingTime = Number(timeout) - new Date().getTime();
    timerId = setTimeout(updateRates, remainingTime);
    localStorage.setItem(
      "timeout",
      (new Date().getTime() + remainingTime).toString()
    );
    console.log(
      "timeout doesn't expired ",
      remainingTime / 1000,
      " seconds left"
    );
    processRates(JSON.parse(currensies), setCurrencyResults);
  } else if (currensies && new Date().getTime() >= Number(timeout)) {
    console.log("timeout expired");
    updateRates(setCurrencyResults);
  }
}

export function processRates(
  data: TCurrencyResults,
  setCurrencyResults: (rates: { [currency: string]: number }) => void
) {
  currenciesCodes.forEach((code: string) => {
    if (currenciesCodes.includes(code)) {
      filteredRates[code] = 1 / data.conversion_rates[code];
    }
  });
  console.log("processRates called");

  setCurrencyResults(filteredRates);

  // console.log("Filtered Rates:", filteredRates);
}
