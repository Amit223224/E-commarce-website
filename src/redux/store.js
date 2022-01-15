import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer} from '../redux/rootReducer';
const composeEnhancers = composeWithDevTools({});
//this method is use for don't lose your data after click refresh
const initialStore ={
    cartReducer:{
        cartItems: JSON.parse(localStorage.getItem('cartItems'))??[]
    }
}
 export const store = createStore( rootReducer, initialStore, composeEnhancers());