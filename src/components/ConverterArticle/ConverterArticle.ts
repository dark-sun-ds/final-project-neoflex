// const targetCurrencies = ["USD", "EUR", "CNY", "UAH", "JPY", "PLN"];
// const baseCurrency = "RUB";
// const converter = document.querySelector(".converter__currencies");
// type TCurrencyResults = {
//   success: boolean;
//   validationMessage: string;
//   result: {
//     from: string;
//     to: string;
//     amountToConvert: number;
//     convertedAmount: number;
//   };
// };

// let currencyResults: TCurrencyResults[] = [];
// let currencyPromises: Promise<TCurrencyResults>[] = [];
// updateRates();

// function updateRates() {
//   currencyResults = [];
//   currencyPromises = [];
//   // Создаю промисы для каждого запроса
//   targetCurrencies.forEach((currency) => {
//     currencyPromises.push(getCurrencyRates(currency, baseCurrency));
//   });

//   // Жду выполнения всех запросов
//   Promise.all(currencyPromises)
//     .then((results) => {
//       // Results - массив, элементы которого результат выполнения кааждого запроса
//       currencyResults.push(...results); // Добавляю результаты в массив ответов
//       console.log(currencyResults);

//       showCurrencies();
//     })
//     .catch((error) => console.error(error));

//   // Перезапускаю функцию через 15 минут
//   setTimeout(updateRates, 15 * 60 * 1000);
// }

// async function getCurrencyRates(targetCurrency: string, baseCurrency: string) {
//   const options = {
//     method: "GET",
//     url: "https://currency-converter18.p.rapidapi.com/api/v1/convert",
//     params: {
//       from: targetCurrency,
//       to: baseCurrency,
//       amount: "1",
//     },
//     headers: {
//       "x-rapidapi-key": "3ecf27eb86mshae87dbdec14138bp16c665jsn0c075d4bb7bd",
//       "x-rapidapi-host": "currency-converter18.p.rapidapi.com",
//     },
//   };
//   try {
//     const response = await axios.request(options);
//     return response.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// export function showCurrencies() {
//   converter.innerHTML = currencyResults
//     .map((item) => {
//       console.log(item);

//       return `<div class="converter__currency">
//               <p class="converter__currency-title">${item.result.from}:</p>
//               <p class="converter__currency-rate">${item.result.convertedAmount.toFixed(
//                 2
//               )}</p>
//             </div>`;
//     })
//     .join("");
// }
export default 0;