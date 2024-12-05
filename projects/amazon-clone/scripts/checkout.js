import {renderCheckoutHeader} from "./checkout/checkoutHeader.js";
import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from "../data/products.js";
import {loadCart, loadCartFetch} from "../data/cart.js";
// import '../data/backend-practice.js';
// Another sintax that runs all the code inside the file, without importing anything
// import '../data/cart-class.js';

// async make the function return a promise
// await let us wait for a promise to finish
async function loadPage() {
    try {
        // We can manually create an error with throw
        //throw 'error 1'

        // Let us wait for asynchonous code as normal code
        await Promise.all([
            await loadProductsFetch(),
            await loadCartFetch()
        ]);

        // We can use await when we are inside async
        /*
        await new Promise((resolve, reject) => {
            // throw 'error 2'
            loadCart(() => {
                // We can create an error in the future
                // reject('error 3')
                resolve()
            });
        });
        */

        

        // We can run other code whenever we catch an error
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }


    renderCheckoutHeader();
    // Initial rendering of the checking list
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

// Sometimes is better to use promise.all to execute both promises at the same time
/*
Promise.all([
    // It return a promise, so make the code cleaner
    loadProductsFetch(),
    new Promise((resolve) => {
        loadCart(() => {
            resolve()
        });
    })

]).then(() => {
    renderCheckoutHeader();
    // Initial rendering of the checking list
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
// The promise run the inner function inmediately
// We can use resolve to know when to go to the next step, but promese create a new route that execute at the same time as others
new Promise((resolve) => {
    // Once loadProducts() finish is going to run the inner function
    loadProducts(() => {
        // We can share a value between two steps
        resolve('value1');
    });
    // then() means the next step

}).then((value) => {
    // If we want to wait inside a promise, we can return a new promise inside
    // This is like another layer of nesting, but more redable
    return new Promise((resolve) => {
        loadCart(() => {
            resolve()
        });
    });

}).then(() => {
    renderCheckoutHeader();
    // Initial rendering of the checking list
    renderOrderSummary();
    renderPaymentSummary();
});
*/


// We dont need to use a function as parameter every time, we can create one anonymous function inside
/*
loadProducts(() => {
    renderCheckoutHeader();
    // Initial rendering of the checking list
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// The problem of callbacks is that cause a lot of nesting, which means a lot of code inside other code
