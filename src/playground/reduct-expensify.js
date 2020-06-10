import { createStore,combineReducers} from 'redux';
import{v4 as uuid} from 'uuid';

const expenseReducerDefaultState = [];
const expenseReducer = (state = expenseReducerDefaultState,action) =>{
    switch(action.type)
    {
        case "ADD_EXPENSE":
            return [
                ...state,
                action.expense
            ];
        case "REMOVE_EXPENSE":
            return state.filter(({ id })=>{
                return id !== action.id;
            })
        case "EDIT_EXPENSE":
            return state.map((expense)=>{
                if(expense.id === action.id ){
                    return {
                        ...expense,
                        ...action.update
                    }
                }
                else{
                    return expense;
                }
            })
        default:
            return state;
    }
}
// ADD EXPENSE ACTION
const addExpense = (
    { 
        description = '', 
        notes = '', 
        amount = 0,
        createdAt = 0
    } = {}
    ) =>({
        type : 'ADD_EXPENSE',
        expense : {
            id : uuid(),
            description,
            notes,
            amount,
            createdAt
        }
});
// REMOVE EXPENSE ACTION
const removeExpense = ({ id }={}) => ({
    type : 'REMOVE_EXPENSE',
    id
})
//EDIT EXPENSE
const editExpense = (id , update) => ({
    type : 'EDIT_EXPENSE',
    id,
    update
});
// SORT BY AMOUNT
const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
})
// SORT BY DATE
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
})
//SET START DATE
const setStartDate = (startDate = undefined ) =>({
    type : 'SET_START_DATE',
    startDate
})

//SET END DATE
const setEndDate = (endDate = undefined ) =>({
    type : 'SET_END_DATE',
    endDate
})
const filterReducerDefaultState = {
    text : 'rent',
    sortBy : 'amount',
    startDate: undefined,
    endDate: undefined
};
const filterReducer = (state = filterReducerDefaultState,action) =>{
    switch(action.type)
    {
        case 'SET_TEXT':
            return {
                ...state,
                text: action.textChange
            }
        case 'SORT_BY_MOUNT':
            return {
                ...state,
                sortBy : 'amount'
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy : 'date'
            }
        case 'SET_START_DATE':
            return{
                ...state,
                startDate : action.startDate
            }
        case 'SET_END_DATE':
            return{
                ...state,
                endDate : action.endDate
            }
        default:
            return state;
    }
}
const store = createStore(
    combineReducers({
        expense : expenseReducer,
        filters : filterReducer
    })
);
// GET visible store
const getExpenseVisible = (expense,{ text,sortBy,startDate,endDate })=>{
    return expense.filter((exp)=>{
        const startDateMatch = typeof startDate !== 'number' || exp.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || exp.createdAt <= endDate;
        const textMatch = true;//exp.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy == 'date'){
            return a.createdAt < b.createdAt ? 1: -1;
        }
        if(sortBy == 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    })
    
};
// Text Filter Change
const serTextFilter = ( textChange ) => ({
    type : 'SET_TEXT',
    textChange
}) 


store.subscribe(()=>{
    const data = store.getState();
    const expenseVisible = getExpenseVisible(data.expense,data.filters);
    console.log(expenseVisible);
})

const expenseOne = store.dispatch(addExpense({description : 'Testing', amount : 100,createdAt : -1000}));
const expenseZero = store.dispatch(addExpense({description : 'Coffee', amount : 500, createdAt: -10}));
const expenseTwo = store.dispatch(addExpense({description : 'Coffee', amount : 200, createdAt: -100}));
const expenseThree = store.dispatch(addExpense({description : 'Milk Tea', amount : 300, createdAt: -50}));
// console.log(expenseOne.expense.id);
// store.dispatch(removeExpense({ id : expenseOne.expense.id }));

// store.dispatch(editExpense(expenseTwo.expense.id, { amount : 250 }))


// store.dispatch(serTextFilter('tes'));

store.dispatch(sortByAmount());

//store.dispatch(sortByDate());


//store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(140));
const demoState = {
    expense : [{
        id : 'abc',
        description : 'January rent',
        note : 'This is final payment',
        amount: 550,
        createdAt : 0
    }],
    filters : {
        text : 'rent',
        sortBy : 'amount',
        startDate: undefined,
        endDate: undefined
    }
}
