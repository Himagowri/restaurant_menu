import { createStore} from 'redux';
import {Reducer,initialState, initialstate} from './reducer';

export const ConfigureStore = () =>{
    const store = createStore(
        Reducer,
        initialstate
    );
    return store;
}