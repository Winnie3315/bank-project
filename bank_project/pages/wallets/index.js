import { reloadHeader } from "../../lib/header"
import { getData } from "../../lib/http"
import { reloadWallet } from "../../lib/wallet"
let user = JSON.parse(localStorage.getItem('user'))

const walletContainer = document.querySelector(".wallet-container")
const btn = document.querySelector('.add')
const email = document.querySelector(".email")
reloadHeader(document.querySelector(".heaeder"))

email.innerHTML = user.email

getData('/wallets?user_id=' + user.id)
    .then(res => {
        if(res.status === 200 || res.status === 201) {
            reloadWallet(res.data, walletContainer)
        }
})

btn.onclick = () => {
    location.assign('/pages/add_wallet/')
}