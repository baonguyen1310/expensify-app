import {createStore} from 'redux';
import { Switch, StaticRouter } from 'react-router-dom';
// Action generator : function return action object

const increment = ({incrementBy = 1} = {}) =>({
    type:'INCREMENT',
    incrementBy
})

const decrement = ({decrementBy = 1} = {}) => ({
    type : 'DECREMENT',
    decrementBy
});

const set = ({count = 1} = {}) => ({
    type : 'SET',
    count
});
const store = new createStore((state = { count : 0},action)=>{
    
    switch(action.type){
        case 'INCREMENT':
            const incrementBy = typeof action.incrementBy === 'number' ? action.incrementBy : 1;
            return { count : state.count + incrementBy}
        case 'DECREMENT':
            const decrementBy = typeof action.decrementBy === 'number' ? action.decrementBy : 1;
            return { count : state.count - decrementBy}
        case 'SET':
            return { 
                count :action.count
            }
        default:
            return state;
    }
})

const subscribe = store.subscribe(()=>{
    console.log(store.getState());
})
// store.dispatch({
//     type : 'INCREMENT',
//     incrementBy : 4
// })
store.dispatch(increment({incrementBy : 6}));

store.dispatch(decrement({decrementBy : 3 }));

store.dispatch(set({count:101}));
// store.dispatch({
//     type : 'DECREMENT',
//     decrementBy : 2
// })

// store.dispatch({
//     type : 'SET',
//     count : 101
// })

