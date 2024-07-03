import moment from "moment/moment";
import { getData, patchData, postData } from "../../lib/http";

const form = document.forms.transactionAdd;
const select = document.querySelector('#wallet')
const total_inp = document.querySelector('#total')
const user = JSON.parse(localStorage.getItem('user'))
let wallets = []
let selected_wallet 

getData('/wallets?user_id=' + user.id)
    .then(res => {
        for (let item of res.data) {
            let idx = res.data.indexOf(item)
            let opt = new Option(`${item.name}`, item.id)

            if(idx === 0) {
                opt.selected = true
                selected_wallet = item
            }

            select.append(opt)
        }

        wallets = res.data
    })

select.onchange = (e) => {
    const id = select.value
    const wallet = wallets.find(item => item.id === id)
            
    if (wallet) {
        selected_wallet = wallet
    } else {
        selected_wallet = null
    }
}
console.log(total_inp.value);

total_inp.onkeyup = (e) => {
    const val = total_inp.value
    console.log(val);
    if (!selected_wallet) {
        console.log("error");
        total_inp.classList.add('error_input')
        return;
    }

    const valNum = parseFloat(val)

    const isValid = !isNaN(valNum) && valNum > 0 && valNum <= selected_wallet.balance;

    total_inp.classList.toggle('error_input', !isValid);
}



form.onsubmit = async (e) => {
    e.preventDefault()

    const fm = new FormData(form);
    const transaction = {
        id: crypto.randomUUID(),
        created_at: moment().format("YYYYMMDD, HH:m"),
        updated_at: new Date().toLocaleTimeString(),
        user_id: user.id,
    };
    fm.forEach((val, key) => transaction[key] = val)


    if (total_inp.value > 0 && +transaction.total <= +selected_wallet.balance) {
        const updatedBalance = +selected_wallet.balance - +total_inp.value;
    
        const { id, user_id, ...walletWithoutIds } = selected_wallet;
        
        transaction.wallet_id = id;
        transaction.wallet = { ...walletWithoutIds, balance: updatedBalance };
    
        patchData(`/wallets/${id}`, { balance: updatedBalance })
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                    postData('/transactions', transaction)
                        .then(res => {
                            if (res.status === 200 || res.status === 201) {
                                e.target.reset()
                                location.assign('/pages/transactions/')
                            }
                        })
                } 
            })
            
    } else {
        alert('you havent enought money!', 'error');
    }
}
