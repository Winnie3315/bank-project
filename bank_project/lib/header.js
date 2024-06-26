export function reloadHeader(body){
    const container = document.createElement("div")
    const header = document.createElement("header")
    const wrap = document.createElement('div')
    const boxLeft = document.createElement('div')
    const boxRight = document.createElement('div')
    const main = document.createElement('a')
    const wallets = document.createElement('a')
    const transactions = document.createElement('a')
    const myEmail = document.createElement('a')
    const leaveIcon = document.createElement('img')

    wrap.classList.add("header-container")
    boxLeft.classList.add("box-left")
    boxRight.classList.add("box-right")
    container.classList.add("container")
    // .classList.add("")

    document.body.prepend(header)
    header.append(container)
    container.append(wrap)
    wrap.append(boxLeft, boxRight)
    boxLeft.append(main, wallets, transactions)
    boxRight.append(myEmail, leaveIcon)

    main.href = "/"
    wallets.href = "/pages/wallets/"
    transactions.href = "/pages/transactions/"


    main.innerHTML = 'Главная'
    wallets.innerHTML = 'Мои кошельки'
    transactions.innerHTML = "Мои транзакции"
    myEmail.innerHTML = 'alexadams@google.com'
    leaveIcon.src = "../public/log-out (1) 1.png"
    leaveIcon.style.cursor = 'pointer'

    leaveIcon.onclick = () => {
        localStorage.removeItem('user')
        location.assign('/pages/signIn/')
    }
}