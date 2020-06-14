import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral'
import getExpenseVisible from '../selectors/expenses';
import selectedTotal from '../selectors/expense-total';

const ExpenseSummary = ({ expenseCount,expenseTotal }) =>{
    const expenseWord = expenseCount <= 1 ? 'Expense' : 'Expenses';
    const formattedExpenseTotal = numeral(expenseTotal/100).format('$0,0.00');
    return (
        <div>
            <h1>Viewing { expenseCount }  { expenseWord } totalling { formattedExpenseTotal }</h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpense = getExpenseVisible(state.expenses,state.filters);
    return {
        expenseCount : visibleExpense.length,
        expenseTotal : selectedTotal(visibleExpense)
    };
};

export default connect(mapStateToProps)(ExpenseSummary);