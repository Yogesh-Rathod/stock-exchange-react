const Crypto = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TO_CRYPTO':
            return [
                {
                    crypto: action.crypto
                }
            ];
        default:
            return state;
    }
};

export default Crypto;
