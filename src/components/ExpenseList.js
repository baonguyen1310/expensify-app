import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getExpenseVisible from '../selectors/expenses';
import ExpenseListFilter from './ExpenseListFilter';

const ExpenseList = (props) =>(
    <div>
        <ExpenseListFilter></ExpenseListFilter>
        <h1>Expense List</h1>
        {
            props.expenses.map((expense)=>{
                return <ExpenseListItem key={expense.id} {...expense}></ExpenseListItem>            
            })
        }
    </div>
);

const mapStateToProps = (state)=>{
    return {
        expenses : getExpenseVisible(state.expenses,state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);