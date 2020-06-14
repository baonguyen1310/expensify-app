import React from 'react';
import ReactDOM from  'react-dom';
import ExpenseList from './ExpenseList'
import ExpenseSummary  from './ExpenseSummary';
const ExpenseDashBoardPage = () => (
    <div>
        <ExpenseSummary></ExpenseSummary>
        
        <ExpenseList></ExpenseList>
    </div>
)

export default ExpenseDashBoardPage;