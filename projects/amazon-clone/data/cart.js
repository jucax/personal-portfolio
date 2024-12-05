import {validDeliveryOption} from './deliveryOptions.js';

// Export allows the variable to be use outsite the file
export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));

    // If there is nothing in local storage cart is null, and then we save the default values
    if (!cart) {
        cart = [{
            productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId: '1'
        }, {
            productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId: '2'
        }];
    }
}


// Save the cart content in local storage so it doesnt reload when we refresh the page
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Export the finction so we can use it in other file
export function addToCart(productId) {
    let matchingItem;

    // We check if the product is already in the cart, so we save it in a matchingItem variable
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // If there is a matchingElement, then we just increase the quantity
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            deliveryOptionId: '1'
        });
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    // Create a new cart
    const newCart = [];
    // Loop through the old cart
    cart.forEach((cartItem) => {
        // Push all to items to the new cart, except the one that we are deleting
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function calculateCartQuantity() {
    // Loop in the quantity of each product in the cart to get the total quantity of products
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    // Show cartQuantity in the page
    if (cartQuantity != 0) {
        document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    }
}

// Function to update the quantity from the checkout page
export function updateQuantity(productId, newQuantity) {
    // Identify the product with that Id in the cart
    let matchingProduct;
    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
            matchingProduct = cartItem;
        }
    });

    // Get the actual quantity and save it to local storage
    matchingProduct.quantity = newQuantity;
    saveToStorage();
}

// Function to update id of the delivery option we are choosing
export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    // We check if the product is already in the cart, so we save it in a matchingItem variable
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });

    // If there is not matching element 
    if (!matchingItem) {
        return;
      }

    // We check if the delivery option is correct
    if (!validDeliveryOption(deliveryOptionId)) {
        return;
    }

    // Get the new delivery option and insert it to the varaible, also save it to local storage
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveToStorage();
}

// Procedural Programming: a set of step-by-step instructions, functions
// Object-Oriented Programming (OOP): organize our code into object


export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
  
    // We can get a JSON from the backend and convert it as we did with the normal objects
    
    xhr.addEventListener('load', () => {
      console.log(xhr.response);
      fun();
    });
  
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();
  }

  export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
  }
  
  // Extra feature: make the cart empty after creating an order.
export function resetCart() {
    cart = [];
    saveToStorage();
}