import { APPROVED_LIST, MISSING_LIST } from "./Types";

const initialState = {
    products: [],
};

const productReducer = (state = initialState, action) => {
    const {type,payload} =action;
    console.log("action",payload)
    switch (type) {
        case APPROVED_LIST:
           
            return {
                ...state,
                products:state.products.concat(payload)
            };

        case MISSING_LIST:
           
            return {
                ...state,
                products: state.products.concat(payload),
            };

        default:
            return state;
    }
};

export default productReducer;
