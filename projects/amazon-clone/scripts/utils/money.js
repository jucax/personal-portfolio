// Function to share with amazon.js and checkout.js files to display the prices correctly
export function formatCurrency(priceCents) {

    return (Math.round(priceCents) / 100).toFixed(2);

}

export default formatCurrency;