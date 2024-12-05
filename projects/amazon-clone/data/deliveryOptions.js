import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

// Funtion to check if the option id exist and is valid
export function validDeliveryOption(deliveryOptionId) {
    let found = false;
  
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        found = true;
      }
    });
  
    return found;
}

function isWeekend(date) {
    const dayOfWeek = date.format('dddd');
    // If the say is weekend
    return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
    let remainingDays = deliveryOption.deliveryDays;
    let deliveryDate = dayjs();

    while (remainingDays > 0) {
        deliveryDate = deliveryDate.add(1, 'day');

        // If the day is not weeekend, then we substract 1 in remaining days
        if (!isWeekend(deliveryDate)) {
            remainingDays--;
        }
    }

    // Use the format rules from the documentation
    const dateString = deliveryDate.format('dddd, MMMM D');

    return dateString;
}