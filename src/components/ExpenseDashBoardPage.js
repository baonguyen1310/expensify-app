import React from 'react';
import ReactDOM from  'react-dom';
import ExpenseList from './ExpenseList'
const ExpenseDashBoardPage = () => (
    <div>
        <p>This is HomePage.</p>
        { <ExpenseList></ExpenseList> }
    </div>
)

export default ExpenseDashBoardPage;