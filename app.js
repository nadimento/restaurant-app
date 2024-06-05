import { menuArr } from './menu.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

let cart = []

const btnSumbitEl = document.getElementById('btn-submit')
const creditCardEl = document.getElementById('credit-card')
const btnPayEl = document.getElementById('btn-pay')
const orderCompleteEl = document.getElementById('order-complete')
const orderContainerEl = document.getElementById('order-container')

// Event Listeners
document.addEventListener('click', pushItemsToCartArr)
document.addEventListener('click', removeItemFromCart)
btnSumbitEl.addEventListener('click', popUpHiddenToggle)

btnPayEl.addEventListener('click', function () {
    creditCardEl.classList.toggle('hidden')
    orderCompleteEl.classList.toggle('hidden')
    orderContainerEl.classList.toggle('hidden')
})


//Render menu items to screen
document.getElementById('main-content').innerHTML = renderMenuItems()

// Map menu items to DOM
function renderMenuItems() {
    const menuItems = menuArr.map((item) => {
        const { name, toppings, price, image, uuid } = item
        return `
        <div class="food-card">
            <div class="card-info">
                <img src="${image}" alt="pizza">
                    <div class="product-info">
                        <h3>${name}</h3>
                        <p class="item-description">${toppings}</p>
                        <p class="price">$${price}</p>
                    </div>
            </div>
            <i class="fa-regular fa-plus" data-add="${uuid}"></i>
        </div>
    `
    }).join('')

    return menuItems
}


// Functions
function popUpHiddenToggle() {
    creditCardEl.classList.toggle('hidden')
}

function removeItemFromCart(e) {
    if (e.target.dataset.remove) {
        const removedObject = cart.filter((item) => {
            return item.uuid.includes(e.target.dataset.remove)
        })[0]

        for (let i = 0; i < cart.length; i++) {
            if (cart[i] === removedObject) {
                cart.splice(i, 1)
            }
        }

        renderCart(cart)
        revealCart()
    }

}

function pushItemsToCartArr(e) {
    if (e.target.dataset.add) {
        const menuItem = menuArr.filter(function (item) {
            return item.uuid.includes(e.target.dataset.add)
        })[0]

        const { name, toppings, price, image } = menuItem

        cart.push({
            name: name,
            toppings: toppings,
            price: price,
            image: image,
            uuid: uuidv4()
        })

        renderCart(cart)
        revealCart()
    }
}

function renderCart(currentCart) {
    const orderEl = document.getElementById('order')

    const cartItems = currentCart.map((item) => {
        const { name, price, uuid } = item

        return `
        <div class="order-item">
            <div>
                <span class="food-item-name">${name}</span>
                <span class="remove-item" data-remove="${uuid}">Remove</span>
            </div>
            <h4>$${price}</h4>
         </div>
    `
    }).join('')

    orderEl.innerHTML = cartItems
    totalPrice()
}

function revealCart() {
    const orderContainerEl = document.getElementById('order-container')

    if (cart.length > 0) {
        orderContainerEl.classList.remove('hidden')
    } else {
        orderContainerEl.classList.add('hidden')
    }
}

function totalPrice() {
    const totalpriceEl = document.getElementById('total-price')

    const totalPrice = cart.reduce((total, currentItem) => {
        return total + currentItem.price
    }, 0)

    totalpriceEl.textContent = `$${totalPrice}`
}



