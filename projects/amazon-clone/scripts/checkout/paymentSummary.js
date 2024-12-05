import {cart, resetCart} from "../../data/cart.js";
import {getProduct} from "../../data/products.js";
import {getDeliveryOption} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";
import {addOrder} from '../../data/orders.js'

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;

    cart.forEach((cartItem) => {
        // Calculate product prices
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;

        // Calculate delivery prices
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
    });

    // Calculate Total before tax in cents 
    const totalBeforeTaxCents = productPriceCents + shippingPriceCents;

    // Calculate Estimated tax in cents
    const taxCents = totalBeforeTaxCents * 0.1;

    //Calculate Total in cents
    const totalCents = totalBeforeTaxCents + taxCents;

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money js-payment-summary-shipping">
                $${formatCurrency(shippingPriceCents)}
            </div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money js-payment-summary-total">
            $${formatCurrency(totalCents)}
            </div>
        </div>

        <button class="place-order-button button-primary
        js-place-order">
            Place your order
        </button>
    `;

    // Selected patment summary div and insert created HTMl
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    document.querySelector('.js-place-order').addEventListener('click', async () => {
        try {
            // We are going to do a request to the backend
            const response = await fetch('https://supersimplebackend.dev/orders', {
                // Type of request
                method: 'POST',
                // More info of the request
                headers: {
                    'Content-Type': 'application/json'
                },
                // Actual data to send, in this case the cart array
                body: JSON.stringify({
                    cart: cart
                })
            });

            // If we want to wait to the response created in the backend to finish
            const order = await response.json();
            addOrder(order);
        } catch(error) {
            console.log('Unexpected error. Try again later');
        }

        // Extra feature to make the cart empty
        resetCart()

        // If we want to open the orders.html file, so we can change what we display
        window.location.href = 'orders.html';
    });
}

// Types of requests
// GET = get something
// POST = create something
// PUT = update something
// DELETE = delete something