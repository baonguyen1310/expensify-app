import React from 'react';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';
import "react-dates/initialize"; 
import { DateRangePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';
class ExpenseListFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            calendarFocused: null
        };
    }
    onDatesChange = ({startDate,endDate}) =>{
        this.props.dispatch(setStartDate(startDate));
        this.props.dispatch(setEndDate(endDate));
    }
    onFocusChange= (calendarFocused) =>{
        this.setState(()=>({ calendarFocused }))
    }
    render(){
        return(
            <div>   
                <input type="text" value={this.props.filters.text} onChange={(e)=>{
                    this.props.dispatch(setTextFilter(e.target.value));
                }}>
                </input>
                <select 
                    value={this.props.filters.sortBy} onChange={(e)=> {
                        if (e.target.value === 'date') {
                            this.props.dispatch(sortByDate())
                        }else if (e.target.value === 'amount') {
                            this.props.dispatch(sortByAmount())
                        }
                    } } >
                        <option value="date">Date</option>
                        <option value="amount">Amount</option>
                </select>
                <DateRangePicker 
                    startDate = { this.props.filters.startDate }
                    startDateId = {'1'}
                    endDate = { this.props.filters.endDate }
                    endDateId = {'2'}
                    onDatesChange = {this.onDatesChange}
                    focusedInput = { this.state.calendarFocused }
                    onFocusChange = { this.onFocusChange }
                    showClearDates = {true}
                    numberOfMonths = {1}
                    isOutsideRange = {()=> false}
                />
            </div>
        );
    }
}

// const ExpenseListFilter = (props)=>(
//     <div>   
//         <input type="text" value={props.filters.text} onChange={(e)=>{
//             props.dispatch(setTextFilter(e.target.value));
//         }}>
//         </input>
//         <select 
//             value={props.filters.sortBy} onChange={(e)=> {
//                 if (e.target.value === 'date') {
//                     props.dispatch(sortByDate())
//                 }else if (e.target.value === 'amount') {
//                     props.dispatch(sortByAmount())
//                 }
//             } } >
//                 <option value="date">Date</option>
//                 <option value="amount">Amount</option>
//         </select>
//     </div>
// );

const mapStateToProps = (state)=>{
    return {
        filters : state.filters
    };
};


export default connect(mapStateToProps)(ExpenseListFilter);