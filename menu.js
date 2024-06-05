import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArr = [
    {
        name: 'Pizza',
        toppings: ['pepperoni', ' mushroom', ' mozarella'],
        price: 14,
        image: './images/pizza.png',
        uuid: uuidv4()
    },

    {
        name: 'Hamburger',
        toppings: ['beef', ' cheese', ' lettuce'],
        price: 14,
        image: 'images/burger.png',
        uuid: uuidv4()
    },

    {
        name: 'Beer',
        toppings: ['grains', ' hops', ' yeast', ' water'],
        price: 12,
        image: 'images/beer.png',
        uuid: uuidv4()
    },
]