export function reloadTransactions(arr, place) {
    place.innerHTML = ''

    for (let item of arr.reverse()) {
        let tr = document.createElement('tr')
        let id = document.createElement('td')
        let wallet = document.createElement('td')
        let category = document.createElement('td')
        let sum = document.createElement('td')
        let over = document.createElement('td')

        
        tr.append(id, wallet, category, sum, over)
        place.append(tr)

        
        id.innerHTML = item.id
        wallet.innerHTML = item.wallet.name
        category.innerHTML = item.category
        sum.innerHTML = item.total
        over.innerHTML = item.created_at
        console.log(item.created_at);
    }
}