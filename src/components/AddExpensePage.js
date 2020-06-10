
import React from 'react';
import ReactDOM from  'react-dom';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm onSave = {(expense)=>{
           props.dispatch(addExpense(expense));
           props.history.push('/');
        }}></ExpenseForm>
    </div>
)

export default connect()(AddExpensePage);