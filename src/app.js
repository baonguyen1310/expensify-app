
import React from 'react';
import ReactDOM from  'react-dom';
import AppRouter from './routers/AppRouter'
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getExpenseVisible from './selectors/expenses';
import './styles/styles.scss'


const store = configureStore();

//add Expense
store.dispatch(addExpense({description : 'Water Bill',amount : 300}));
store.dispatch(addExpense({description : 'Gas Bill',amount : 200,createdAt:100}));
store.dispatch(addExpense({description : 'Rent',amount : 500}));
//set text filter
// store.dispatch(setTextFilter('water'));
// setTimeout(()=>{
//     store.dispatch(setTextFilter('rent')); 
// },300)
var state = store.getState();
var visibleExpense = getExpenseVisible(state.expenses,state.filters);


const Jsx = (
    <Provider store = {store}>
        <AppRouter></AppRouter>
    </Provider>
);
ReactDOM.render(Jsx,document.getElementById('app'));
