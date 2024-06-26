function getRandomBg(){
    let deg = Math.floor(Math.random() * 360)
    function random(){
        return Math.floor(Math.random() * 255)
    }
    let fst = random()
    let sec = random()
    let thrd = random()

    const rgb = `rgb(${fst}, ${sec}, ${thrd})`

    let gradient = `linear-gradient(${deg}deg, ${rgb}, ${rgb}, ${rgb})`

    return gradient
}


export function reloadWallet(arr, place) {
    place.innerHTML = ''

    for (const item of arr) {
        let div = document.createElement('div')
        let h3 = document.createElement('h3')
        let p = document.createElement('p')
        div.classList.add('card_visa')
        div.style.background = getRandomBg()
        h3.innerHTML = item.name
        p.innerHTML = item.currency

        div.append(h3, p)
        place.append(div)
    }
}





