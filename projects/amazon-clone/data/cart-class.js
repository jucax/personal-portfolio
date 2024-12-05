import {validDeliveryOption} from './deliveryOptions.js';

class Cart {
    // Classes use diferent sintax than the objects, we dont need to use undefined
    cartItems;
    // New property, instead of a parameter for functions
    // # means that the property is private, so it can only be use inside this class
    #localStorageKey;

    // Its like a normal method, but it run the code automatically, so is good for setup code
    constructor(localStorageKey) {
        // Instead of insert the localStorageKey as a parameter, we asign it after the object generation, but before we load to local storage
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    // We can make a method private with the # as well
    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.
            #localStorageKey));
    
        if (!this.cartItems) {
            this.cartItems = [{
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

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });
    
        if (matchingItem) {
            matchingItem.quantity += 1;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: 1,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }

    removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;
        
        this.saveToStorage();
    }

    calculateCartQuantity() {
        let cartQuantity = 0;
    
        this.cartItems.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        });
    
        if (cartQuantity != 0) {
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
        }
    }

    updateQuantity(productId, newQuantity) {
        let matchingProduct;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                matchingProduct = cartItem;
            }
        });

        matchingProduct.quantity = newQuantity;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
    
        this.cartItems.forEach((cartItem) => {
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
    
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

// To generate an object with a class we use a similar sintax, but include the word "new"
// Objects generated from a class are called instance
// Because we have a constructor we can pass some values to the class
export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);


// Procedural Programming: a set of step-by-step instructions, functions
// Object-Oriented Programming (OOP): organize our code into object
    // OOP - Tries to represent a real world
    // Classes: Object generator
        // Cleaner and with more features than functions