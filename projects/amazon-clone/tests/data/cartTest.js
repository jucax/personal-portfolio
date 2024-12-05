import {addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption} from "../../data/cart.js";

describe('Test suite: addToCart', () => {
    //We try to maximize test coverage, which means how much of the code is being tested
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
    });

    it('Adds an existing product to the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // We override the function with this instructions
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                delivetyOptionId: '1'
            }]);
        });
        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        // It check how many times the method inside was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

        // It check if we have the correct product in the cart
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1'
          }]));

        // It checks if the product in the cart is the correct one
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // It checks if we have the correct quantity of products
        expect(cart[0].quantity).toEqual(2);
    });

    // Flaky test, because if passes depending on what is saved in local storage
    it('Adds a new product to the cart', () => {
        // Create a mock, a fake version of a function to make whatever we need

        // Jasmine use spyOn to create a mock, the first parameter is the object, the second is the method that we want to mock, and the content inside is the new functionality
        
        spyOn(localStorage, 'getItem').and.callFake(() => {
            // We override the function with this instructions
            return JSON.stringify([]);
        });
        loadFromStorage();
        
        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart.length).toEqual(1);

        // It check how many times the method inside was called
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);

         // It check if we have the correct product in the cart
        expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }]));

        // It checks if the product in the cart is the correct one
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

        // It checks if we have the correct quantity of products
        expect(cart[0].quantity).toEqual(1);
    });
});

// New group of tests for removeFromCart function
describe('Test suite: removeFromCart', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
    });
  
    it('Removes a product from the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }]);
      });
      loadFromStorage();
  
      removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart.length).toEqual(0);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    });
  
    it('Does nothing if product is not in the cart', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }]);
      });
      loadFromStorage();
  
      removeFromCart('does-not-exist');
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
    });
  });

  // New group of tests for updateDeliveryOption function
  describe('Test suite: updateDeliveryOption', () => {
    beforeEach(() => {
      spyOn(localStorage, 'setItem');
    });
  
    it('Updates the delivery option', () => {
      spyOn(localStorage, 'getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }]);
      });
      loadFromStorage();
  
      updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
      expect(cart[0].deliveryOptionId).toEqual('3');
  
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '3'
      }]));
    });

    it('Does nothing if the product is not in the cart', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }]);
        });
        loadFromStorage();
    
        updateDeliveryOption('does-not-exist', '3');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
      });

    it('does nothing if the delivery option does not exist', () => {
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: '1'
            }]);
        });
        loadFromStorage();
        
        updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(cart[0].quantity).toEqual(1);
        expect(cart[0].deliveryOptionId).toEqual('1');
        expect(localStorage.setItem).toHaveBeenCalledTimes(0);
    });
});