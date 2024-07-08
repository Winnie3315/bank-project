// import axios from "axios";
// import { getData, getSymbols } from "../../lib/http";
// import { reloadMethod } from "../../lib/wallet";



// const wallet_id = location.search.split('=').at(-1);

// const card_name = document.querySelector('.card_name');
// const card_balance = document.querySelector('.card_balance');
// const card_back_name = document.querySelector('.card_back_name');
// const card_currency = document.querySelector('.currency');
// const methodContainer = document.querySelector(".method-box");
// const h1 = document.querySelector("h1");
// const user = JSON.parse(localStorage.getItem('user'));

// let wallet;

// getData('/wallets/' + wallet_id)
//     .then(res => {
//         if (res.status === 200 || res.status === 201) {
//             wallet = res.data;

//             card_name.innerHTML = res.data.name;
//             card_balance.innerHTML = `${res.data.balance} ${res.data.currency}`;
//             card_back_name.innerHTML = res.data.name;
//             card_currency.innerHTML = res.data.currency;
//             h1.innerHTML = res.data.name;
//         } else {
//             alert('Error(404), try later', 'error');
//         }
//     });

// const card = document.querySelector('.card');
// const select = document.querySelector('#currencyFrom');
// const selectTo = document.querySelector("#currencyTo");

// getSymbols()
//     .then((symbols) => {
//         for (let key in symbols) {
//             let opt = new Option(`${key} - ${symbols[key]}`, key);
//             select.append(opt);
//         }
//     });

// getSymbols()
//     .then((symbols) => {
//         for (let key in symbols) {
//             let opt = new Option(`${key} - ${symbols[key]}`, key);
//             selectTo.append(opt);
//         }
//     });

// card.ondblclick = () => {
//     card.classList.toggle('flipped');
// };

// getData('/wallets?user_id=' + user.id)
// .then(res => {
//     if (res.status === 200 || res.status === 201) {
//         reloadMethod(res.data, methodContainer);

//         res.data.forEach(wallet => {
//             const methodElement = document.querySelector(`.method[data-id="${wallet.id}"]`);
//             if (methodElement) {
//                 if (wallet_id === wallet.id.toString()) {
//                     methodElement.classList.add("active");
//                     methodElement.classList.remove("default");
//                 } else {
//                     methodElement.classList.remove("active");
//                     methodElement.classList.add("default");
//                 }
//             }
//         });
//     }
// });



// const res = Promise.all([getData('/transactions?wallet_id=' + wallet_id)])
//     .then((arr) => {
//         const [wallet, transactions] = arr

//         initChart(transactions.data)
//     })

// const form = document.forms.namedItem("currencyForm");
// form.onsubmit = (e) => {
//     e.preventDefault();
//     let fm = new FormData(e.target);

//     let convert_to = document.querySelector("#currencyTo").value;
//     let convert_from = document.querySelector("#currencyFrom").value;
//     let amount = document.querySelector("#amount").value;
//     let result = document.querySelector(".result");

//     axios.get(`https://api.apilayer.com/fixer/convert?to=${convert_to}&from=${convert_from}&amount=${amount}`, {
//         headers: {
//             "apikey": import.meta.env.VITE_API_KEY
//         }
//     })
//     .then(res => {
//         if (res.data.success) {
//             result.innerHTML = res.data.result;
//         } else {
//             console.error('Currency conversion failed', res.data.error);
//         }
//     })
// };

// function initChart(data) {
//     const spendings = []
//     const spending_dates = []

//     data.forEach((transaction) => {
//         spending_dates.push(transaction.creaated_at)
//         spendings.push(transaction.total)
//     })


//     var ctx = document.getElementById('transactionChart').getContext('2d');
//     new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: spending_dates,
//             datasets: [{
//                 label: 'transactions',
//                 data: spendings,
//                 borderColor: 'red',
//                 fill: false
//             }]
//         },
//     });

// }


import axios from "axios";
import { getData, getSymbols } from "../../lib/http";
import { reloadMethod } from "../../lib/wallet";

const wallet_id = location.search.split('=').at(-1);

const card_name = document.querySelector('.card_name');
const card_balance = document.querySelector('.card_balance');
const card_back_name = document.querySelector('.card_back_name');
const card_currency = document.querySelector('.currency');
const methodContainer = document.querySelector(".method-box");
const h1 = document.querySelector("h1");
const user = JSON.parse(localStorage.getItem('user'));

let wallet;

getData('/wallets/' + wallet_id)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            wallet = res.data;

            card_name.innerHTML = res.data.name;
            card_balance.innerHTML = `${res.data.balance} ${res.data.currency}`;
            card_back_name.innerHTML = res.data.name;
            card_currency.innerHTML = res.data.currency;
            h1.innerHTML = res.data.name;
        } else {
            alert('Error(404), try later', 'error');
        }
    })
    .catch(err => {
        console.error('Failed to fetch wallet data:', err);
    });

const card = document.querySelector('.card');
const select = document.querySelector('#currencyFrom');
const selectTo = document.querySelector("#currencyTo");

getSymbols()
    .then((symbols) => {
        for (let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key);
            select.append(opt);
        }
    });

getSymbols()
    .then((symbols) => {
        for (let key in symbols) {
            let opt = new Option(`${key} - ${symbols[key]}`, key);
            selectTo.append(opt);
        }
    });

card.ondblclick = () => {
    card.classList.toggle('flipped');
};

getData('/wallets?user_id=' + user.id)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            reloadMethod(res.data, methodContainer);

            res.data.forEach(wallet => {
                const methodElement = document.querySelector(`.method[data-id="${wallet.id}"]`);
                if (methodElement) {
                    if (wallet_id === wallet.id.toString()) {
                        methodElement.classList.add("active");
                        methodElement.classList.remove("default");
                    } else {
                        methodElement.classList.remove("active");
                        methodElement.classList.add("default");
                    }
                }
            });
        }
    })
    .catch(err => {
        console.error('Failed to fetch wallets data:', err);
    });

Promise.all([getData('/wallets/' + wallet_id), getData('/transactions?wallet_id=' + wallet_id)])
    .then((arr) => {
        const [walletRes, transactionsRes] = arr;

        if (walletRes.status === 200 || walletRes.status === 201) {
            wallet = walletRes.data;
        } else {
            console.error('Failed to fetch wallet data');
        }

        if (transactionsRes.status === 200 || transactionsRes.status === 201) {
            initChart(transactionsRes.data);
        } else {
            console.error('Failed to fetch transactions data');
        }
    })
    .catch(err => {
        console.error('Failed to fetch wallet or transactions data:', err);
    });

const form = document.forms.namedItem("currencyForm");
form.onsubmit = (e) => {
    e.preventDefault();
    let fm = new FormData(e.target);

    let convert_to = document.querySelector("#currencyTo").value;
    let convert_from = document.querySelector("#currencyFrom").value;
    let amount = document.querySelector("#amount").value;
    let result = document.querySelector(".result");

    axios.get(`https://api.apilayer.com/fixer/convert?to=${convert_to}&from=${convert_from}&amount=${amount}`, {
        headers: {
            "apikey": import.meta.env.VITE_API_KEY
        }
    })
    .then(res => {
        if (res.data.success) {
            result.innerHTML = res.data.result;
        } else {
            console.error('Currency conversion failed', res.data.error);
        }
    })
    .catch(err => {
        console.error('Currency conversion request failed:', err);
    });
};

function initChart(data) {
    const spendings = [];
    const spending_dates = [];

    data.forEach((transaction) => {
        spending_dates.push(transaction.created_at);
        spendings.push(transaction.total);
    });

    var ctx = document.getElementById('transactionChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: spending_dates,
            datasets: [{
                label: 'Transactions',
                data: spendings,
                borderColor: 'red',
                fill: false
            }]
        },
    });
}