// We create an array for orders or get it from local storage
export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    // unshift add the elements to the front of the array
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    let matchingOrder;
  
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });
  
    return matchingOrder;
}