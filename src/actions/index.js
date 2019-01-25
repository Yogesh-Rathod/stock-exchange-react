export const addStock = stock => ({
    type: 'ADD_TO_STOCKS',
    stock: stock
});

export const addCrypto = crypto => ({
    type: 'ADD_TO_CRYPTO',
    crypto: crypto
});
