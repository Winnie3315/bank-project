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
    }
}





