import {validDeliveryOption} from './deliveryOptions.js';
// In OOP the things that generate objects use PascalCase
// We create a function to create objects, instead of copy paste the code, and we can use parameters to create the objects with different characteristics
function Cart(localStorageKey) {
    const cart = {
        // We can't use export inside an object, so we convert it into a propery
        // This is how we get a variable into an object
        cartItems: undefined,

        // This is how we get a function into an object, and becomes a method
        loadFromStorage() {
            // We can use "this" instead of a variable name, it means the outer object
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
        
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
        },

        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },

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

            // If we want to acces a function that is inside the object, we need to access the object first
            this.saveToStorage();
        },

        removeFromCart(productId) {
            const newCart = [];

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId !== productId) {
                    newCart.push(cartItem);
                }
            });
            this.cartItems = newCart;
            
            this.saveToStorage();
        },

        calculateCartQuantity() {
            let cartQuantity = 0;
        
            this.cartItems.forEach((cartItem) => {
                cartQuantity += cartItem.quantity;
            });
        
            if (cartQuantity != 0) {
                document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
            }
        },

        updateQuantity(productId, newQuantity) {
            let matchingProduct;

            this.cartItems.forEach((cartItem) => {
                if (cartItem.productId === productId) {
                    matchingProduct = cartItem;
                }
            });

            matchingProduct.quantity = newQuantity;
            this.saveToStorage();
        },

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
    };
    
    return cart;
}

const cart = Cart('cart-oop');

// In OOP we can easily duplicate object, so we can have two carts 
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);

// Procedural Programming: a set of step-by-step instructions, functions
// Object-Oriented Programming (OOP): organize our code into object
    // OOP - Tries to represent a real world