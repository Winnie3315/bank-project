// const walletCard = document.querySelector('.wallet-card');
//     walletCard.ondblclick = () => {
//         walletCard.classList.toggle('flipped');
//     }

import { getData } from "../../lib/http";
import { reloadMethod } from "../../lib/wallet";

    var ctx = document.getElementById('transactionChart').getContext('2d');
    var transactionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Income',
                data: [50, 100, 150, 100, 200, 150],
                borderColor: 'red',
                fill: false
            }, {
                label: 'Expense',
                data: [80, 120, 130, 80, 150, 180],
                borderColor: 'blue',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Amount'
                    }
                }
            }
        }
    });

const wallet_id = location.search.split('=').at(-1)

const card_name = document.querySelector('.card_name')
const card_balance = document.querySelector('.card_balance')
const card_back_name = document.querySelector('.card_back_name')
const card_currency = document.querySelector('.currency')
const methodContainer = document.querySelector(".method-box")
const h1 = document.querySelector("h1")
const user = JSON.parse(localStorage.getItem('user'))

let wallet

getData('/wallets/' + wallet_id)
    .then(res => {
        if (res.status === 200 || res.status === 201) {
            wallet = res.data

            card_name.innerHTML = res.data.name
            card_balance.innerHTML = `${res.data.balance} ${res.data.currency}`
            card_back_name.innerHTML = res.data.name
            card_currency.innerHTML = res.data.currency
            h1.innerHTML = res.data.name
        } else {
            alert('Eror(404), try later', 'error')
        }
    })

const card = document.querySelector('.card')

card.ondblclick = () => {
    card.classList.toggle('flipped')
}

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
});
