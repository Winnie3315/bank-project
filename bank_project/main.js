import { reloadHeader } from "./lib/header"
import { getData } from "./lib/http"
import { reloadTransactions } from "./lib/transactions"
import { reloadWallet } from "./lib/wallet"
let user = JSON.parse(localStorage.getItem('user'))

let body = document.querySelector('.header')
reloadHeader(body)

let user_view = document.querySelector('#user')
let userSurname_view = document.querySelector('.user_sn')
let email_view = document.querySelector('.email')
let emailHeader_view = document.querySelector('.box-right a')

user_view.innerHTML = user.name
userSurname_view.innerHTML = user.surname
emailHeader_view.innerHTML = user.email
email_view.innerHTML = user.email