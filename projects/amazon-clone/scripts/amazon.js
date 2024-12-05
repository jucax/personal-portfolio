// 1 step: Save the data
// The data comes form products.js
let productsHTML = '';

// import call a variable from other file
// when we import we can save the varaible with other name to avoid naming conflictions, just use 'name' as 'new name'
import {cart, addToCart, calculateCartQuantity} from '../data/cart.js';
import {products, loadProducts} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

// We are giving a callback, which means give a function as a parameter to run it in the future
loadProducts(renderProductsGrid);

function renderProductsGrid() {

    const url = new URL(window.location.href);
    const search = url.searchParams.get('search');

    let filteredProducts = products;

    // If a search exists in the URL parameters,
    // filter the products that match the search.
    if (search) {
        filteredProducts = products.filter((product) => {
            let matchingKeyword = false;

            product.keywords.forEach((keyword) => {
              if (keyword.toLowerCase().includes(search.toLowerCase())) {
                matchingKeyword = true;
              }
            });
      
            return matchingKeyword ||
              product.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    // 2 step: Create the HTML
    filteredProducts.forEach((product) => {
        calculateCartQuantity();
        productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image"
                    src="${product.image}">
            </div>

            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>

            <div class="product-rating-container">
                <img class="product-rating-stars"
                    src="${product.getStarsUrl()}">
                <div class="product-rating-count link-primary">
                    ${product.rating.count}
                </div>
            </div>

            <div class="product-price">
                ${product.getPrice()}
            </div>

            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>

            ${product.extraInfoHTML()}

            <div class="product-spacer"></div>

            <div class="added-to-cart js-added-to-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>

            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
        `;
    });

    document.querySelector('.js-products-grid').innerHTML = productsHTML;

    // Step 3: Make it interactive
    // Add to cart button 

    // querySelectorAll returns a list with all the objects with that class, so we need to loop through them 

    function showAddedMessage(productId) {
        // To show the added message
        const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
        addedMessage.classList.add('added-to-cart-visible');

        //To make the message disappear with a specific interval
        setTimeout(() => {
            addedMessage.classList.remove('added-to-cart-visible');
        }, 2000);
    }

    document.querySelectorAll('.js-add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
            // Data attribute allows us to attach information to any element, it is an attribute like class="", the syntax is data-[name]=""
            // .dataset gives all the data attributes in that element
            const productId = button.dataset.productId;
            addToCart(productId);
            calculateCartQuantity();
            showAddedMessage(productId);
        });
    });
    
    document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });

    // Extra feature: searching by pressing "Enter" on the keyboard.
    document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = document.querySelector('.js-search-bar').value;
            window.location.href = `amazon.html?search=${searchTerm}`;
        }
    });
}
/* 14-Modules
To avoid naming issues with variables with the same name
The modules contain a variable inside a faile so it doesnt conflict with the rest of the variables
To create a module:
1. Create files 2. Dont load the file in HTML with <script>
To connect a module:
1. Add type="module" 2. Export 3. Import

type="module": allows a script to use variables from other files 

Modules just work when we work with live server, it avoid naming issues and also we dont have to worry abour the order we load the files

*/

// Finished project