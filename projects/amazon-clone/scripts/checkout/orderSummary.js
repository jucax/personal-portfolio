import {cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
// ./ represents the current folder
import {formatCurrency} from '../utils/money.js';
// We can use modules with external libraries, but we need the ESM version
// Default export is when we just need one thing to export, don't write the {}
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';
import {renderCheckoutHeader} from './checkoutHeader.js';
    
    // Main function to render all the html when needed
    export function renderOrderSummary() {
    
        // Identify the selected product and take the details from the products array
        let cartSummaryHTML = '';
    
        cart.forEach((cartItem) => {
            const productId = cartItem.productId;
            calculateCartQuantity();
    
            const matchingProduct = getProduct(productId);
    
            // Help us get the deliveryId to display the correct date in the header
            const deliveryOptionId = cartItem.deliveryOptionId;
            const deliveryOption = getDeliveryOption(deliveryOptionId);
    
            // Display delivery date with function
            const dateString = calculateDeliveryDate(deliveryOption);
    
            cartSummaryHTML += `
            <div class="cart-item-container 
            js-cart-item-container
            js-cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>
    
                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProduct.image}">
    
                    <div class="cart-item-details">
                    <div class="product-name 
                    js-product-name-${matchingProduct.id}">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price
                    js-product-price-${matchingProduct.id}">
                        ${matchingProduct.getPrice()}
                    </div>
                    <div class="product-quantity
                    js-product-quantity-${matchingProduct.id}">
                        <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">
                        ${cartItem.quantity}
                        </span>
                        </span>
                        <span class="update-quantity-link link-primary js-update-link"
                        data-product-id="${matchingProduct.id}">
                        Update
                        </span>
                        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                        <span class="save-quantity-link link-primary js-save-link"
                        data-product-id="${matchingProduct.id}">
                        Save
                        </span>
                        <span class="delete-quantity-link link-primary js-delete-link 
                        js-delete-link-${matchingProduct.id}" 
                        data-product-id="${matchingProduct.id}">
                        Delete
                        </span>
                    </div>
                    </div>
    
                    <div class="delivery-options">
                    <div class="delivery-options-title">
                        Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>
            `;
        });
    
        function deliveryOptionsHTML(matchingProduct, cartItem) {
            let html = '';
    
            deliveryOptions.forEach((deliveryOption) => {
                // Display delivery date with function
                const dateString = calculateDeliveryDate(deliveryOption);
    
                // Ternary operation to decide if the price will display as FREE or in dollars
                const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
    
                // Based on the id 1, 2 or 3 of the delivery option, we checked the input of each item
                const isChecked = deliveryOption.id == cartItem.deliveryOptionId;
    
                html +=
                `<div class="delivery-option js-delivery-option
                js-delivery-option-${matchingProduct.id}-${deliveryOption.id}"
                    data-product-id="${matchingProduct.id}"
                    data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input
                    js-delivery-option-input-${matchingProduct.id}-${deliveryOption.id}"
                    name="delivery-option-${matchingProduct.id}">
                    <div>
                    <div class="delivery-option-date">
                        ${dateString}
                    </div>
                    <div class="delivery-option-price">
                        ${priceString} Shipping
                    </div>
                    </div>
                </div>`
            });
            return html;
        }
    
        // Insert the new HTML in the container
        document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
    
        // Select delete links in the checkout
        document.querySelectorAll('.js-delete-link').forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
                removeFromCart(productId);

                // To update the header
                renderCheckoutHeader();
    
                // To update without the element deleted
                renderOrderSummary();

                // regenerate and recalculate after we delete something
                calculateCartQuantity();
                renderPaymentSummary();
            });
        });
    
        // Select update links in the checkout
        document.querySelectorAll('.js-update-link').forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
    
                // Identify which product are we updating
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                // Make input and "Save" appear, and quantity label and "Update disappear"
                container.classList.add('is-editing-quantity');
            });
        });
    
        document.querySelectorAll('.js-save-link').forEach((link) => {
            link.addEventListener('click', () => {
                const productId = link.dataset.productId;
    
                // Identify which product are we updating
                const container = document.querySelector(`.js-cart-item-container-${productId}`);
                // Make input and "Save" disappear, and quantity label and "Update appear"
                container.classList.remove('is-editing-quantity');
    
                // Get the quantity from the input
                const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
    
                //Validation for acceptable quantity values
                if (newQuantity < 1 || newQuantity >= 1000) {
                    alert('Quantity must be at least 1 and less than 1000');
                    return;
                }
    
                // Update the new quantity
                updateQuantity(productId, newQuantity);
    
                // Update quantity label
                const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
                quantityLabel.innerHTML = newQuantity;
    
                // Update quantity to display in the header of the checkout page
                calculateCartQuantity();
            });
        });
    
        // Querry selector to get the delovery option select and update the header of the product
        document.querySelectorAll('.js-delivery-option'). forEach((element) => {
            element.addEventListener('click', () => {
                // Shorthand Property to get the data attributes declared in the html
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                // Using the main render function to update all the data needed, we are re running the function with recursion
                renderOrderSummary();
                renderPaymentSummary();
            });
        });
    }

    
    // MVC
    // M = Model: saves and manages data
    // V = View: takes the data and displays 
    // C = Controller: run code when we interact
    // Many Java Script frameworks are based on MVC
    