"use strict"

function getCategories() {
    const categories = [
        {
            name: 'Pastas',
            id: 'pastas',
            content: [
                "Moñitos", "Tirabusones", "capeletinis", "Capeletis"
            ]
        },
        {
            name: 'Empanadas',
            id: 'empanadas',
            content: ["Empanadas de carne", "Empanadas de jamon y queso", "Empanafas arabes"]
        },
        {
            name: 'Carnes blancas',
            id: 'carnesBlancas',
            content: ["Pollo frito", 'Pollo a la plancha', 'Pollo al horno con papas']
        },
        {
            name: 'Carnes Rojas',
            id: 'carnesRojas',
            content: ['carne al horno con papas']
        }
    ]

    return categories
}

function getCategorieContent(categorieID) {
    const categories = getCategories()
    const categorie = categories.filter(categorie => categorie.id == categorieID).at(0)
    return categorie.content
}

const askFromCustomer = []

const categoriesContainer = document.getElementById('categories')
const categorieListContainer = document.getElementById('categorieList')
const askFromCustomerHTMLContainer = document.getElementById('askFromCustomerContainer')

const showCategorieContent = (categorieContent) => {
    categorieListContainer.innerHTML = categorieContent.map(categorieItem => 
        `<li class="item">
            ${categorieItem}
            <input type="number" class="item-inputNumber">
            <button class="item-send">Pedir</button>
        </li>`
    ).join('')
}

const showCategories = () => {
    const categories = getCategories()
    categoriesContainer.innerHTML = categories.map(({ name, id, content }) => 
        `<li class="categories__categorie" id="${id}">${name}</li>`
    ).join('')
}

showCategories()

categoriesContainer.addEventListener('click', (e) => {
    if(e.target.classList[0] == 'categories__categorie') {
        const categorieName = e.target.id
        const categorieContent = getCategorieContent(categorieName)
        showCategorieContent(categorieContent)
    }
})

categorieListContainer.addEventListener('click', e => {
    if(e.target.classList[0] == 'item-send') {
        const item = {
            name: `${e.target.parentElement.innerText}`.slice(0, -5),
            amountOfAsk: e.target.previousElementSibling.value || 1
        }
        askFromCustomer.push(item)
        e.target.previousElementSibling.value = ''
    }
})

const showAskFromCustomer = (btnElement) => {
    const askFromCustomerHTMLContainer = document.getElementById('askFromCustomer')
    
    if(btnElement.innerText == 'Ver pedido') {
        askFromCustomerHTMLContainer.innerHTML = askFromCustomer.map(item => 
            `<li class="list__item"> ${item.amountOfAsk} - ${item.name}</li>`
        ).join('')
        btnElement.innerText = 'Ocultar pedido'
    } else {
        askFromCustomerHTMLContainer.innerHTML = ''
        btnElement.innerText = 'Ver pedido'
    }
}

askFromCustomerHTMLContainer.addEventListener('click', (e) => {
    const id = e.target.id
    
    if(id == 'showAskFromCustomerBtn') {
        showAskFromCustomer(e.target)
    }
    else if (id == 'dontTakeAskFromCustomerBtn') {
        askFromCustomer.length = 0
        const showAskFromCustomerBtn = document.getElementById('showAskFromCustomerBtn')
        showAskFromCustomerBtn.innerText = 'Ocultar pedido'
        showAskFromCustomer(showAskFromCustomerBtn)
    } 
    else if (id == 'takeAskFromCustomerBtn') {
        console.log('take ask from customer!')
    }
})