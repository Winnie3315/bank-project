import { reloadHeader } from "../../lib/header"
import { getData } from "../../lib/http"
import { reloadTransactions } from "../../lib/transactions"
const user = JSON.parse(localStorage.getItem('user'))

const tbody = document.querySelector('tbody')
const btn = document.querySelector(".addTbtn")
const email = document.querySelector(".email")
reloadHeader(document.querySelector(".heaeder"))

email.innerHTML = user.email

getData('/transactions?user_id=' + user.id)
    .then(res => {
        reloadTransactions(res.data, tbody)
})

btn.onclick = () => {
    location.assign("/pages/add_transaction/")
}