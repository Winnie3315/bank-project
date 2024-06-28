import { postData } from "../../lib/http"

const form = document.forms.namedItem("add_cardForm")
const balance = document.querySelector("#balance")
const user = JSON.parse(localStorage.getItem("user"))

form.onsubmit = (e) => {
    e.preventDefault()

    let fm = new FormData(e.target)
    let wallet = {
        id: crypto.randomUUID(),
        created_at: new Date().toLocaleDateString(),
        updated_at: new Date().toLocaleDateString(),
        user_id: user.id
        // balance: fm.get(balance)
    }

    fm.forEach((value, key) => {
        wallet[key] = value
    })
    console.log(wallet);
    const {name, balance, currency} = wallet

    if(name && balance && currency){
        postData('/wallets', wallet)
            .then(res => {
                if(res.status === 200 || res.status === 201) {
                    alert('Success')
                    location.assign("/pages/wallets/")
                }
            })
    }
    
}