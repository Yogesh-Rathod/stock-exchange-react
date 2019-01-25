const Stocks = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_STOCKS':
            return [
                {
                    stock: action.stock
                }
            ];
        default:
            return state;
    }
};

export default Stocks;
