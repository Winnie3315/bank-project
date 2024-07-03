import { reloadHeader } from "./lib/header"
import { getData } from "./lib/http"
import { reloadTransactions } from "./lib/transactions"
import { reloadWallet } from "./lib/wallet"
let user = JSON.parse(localStorage.getItem('user'))

let body = document.querySelector('.header')
reloadHeader(body, user.email)

let user_view = document.querySelector('#user')
let userSurname_view = document.querySelector('.user_sn')
let email_view = document.querySelector('.email')
let emailHeader_view = document.querySelector('.box-right a')
const walletContainer = document.querySelector(".wallet-container")
const tbody = document.querySelector("tbody")

user_view.innerHTML = user.name
userSurname_view.innerHTML = user.surname
emailHeader_view.innerHTML = user.email
email_view.innerHTML = user.email

getData('/wallets?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reloadWallet(res.data.slice(0, 4), walletContainer);
    }
})
getData('/transactions?user_id=' + user.id)
.then(res => {
    if (res.status === 200 || res.status === 201) {
        reloadTransactions(res.data.slice(0,7), tbody,);
    }
})