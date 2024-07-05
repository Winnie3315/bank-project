function getRandomBg() {
    let deg = Math.floor(Math.random() * 360);

    function random() {
        return Math.floor(Math.random() * 255);
    }

    function getRandomColor() {
        let r = random();
        let g = random();
        let b = random();
        return `rgb(${r}, ${g}, ${b})`;
    }

    let color1 = getRandomColor();
    let color2 = getRandomColor();
    let color3 = getRandomColor();

    let gradient = `linear-gradient(${deg}deg, ${color1}, ${color2}, ${color3})`;

    return gradient;
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

        div.ondblclick = () => {
            location.assign('/pages/wallet/?id=' + item.id)
        }
    }
}


export function reloadMethod(arr, place){
    place.innerHTML = ''

    for(let item of arr){
        const div = document.createElement("div")
        const p = document.createElement('p')
        const balance = document.createElement('p')
        div.setAttribute('data-id', item.id);

        div.classList.add('method')
        p.classList.add("method-name")
        balance.classList.add("method-balance")

        p.innerHTML = item.name
        balance.innerHTML = item.balance

        div.append(p, balance)
        place.append(div)
    }
    

}




