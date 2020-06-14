import React from 'react';
import moment from 'moment';
import "react-dates/initialize"; 
import { SingleDatePicker } from 'react-dates';
// import 'react-dates/lib/css/_datepicker.css';

export default class ExpenseForm extends React.Component{
    constructor(props)
    {
        super(props);
        const data = props.expense;
        this.state = {
            description : data ? data.description : '',
            amount : data ? (data.amount/100).toString() : '',
            note: data? data.note : '',
            createdAt : data ? moment(data.createdAt) : moment(),
            calendarFocused : false,
            errors : ''
        };
    }
    
    onChangeDescription = (e) => {
        const description = e.target.value;
        this.setState(()=>({
            description
        }))
    };
    onChangeNotes = (e)=>{
        const note = e.target.value;
        this.setState(()=>({ note }));
    };
    onChangeAmount = (e)=>{
        const amount = e.target.value;

        if(amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(()=>({amount}));
        }
    }
    onDateChange = (createdAt)=>{
        if(createdAt){
            this.setState(()=>({
                createdAt
            }));
        }
       
    }
    onFocusChange = ({ focused })=>{
        this.setState(()=>({
            calendarFocused : focused
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        const isInValid = (!this.state.description || !this.state.amount);
        this.setState(()=>({
            errors : isInValid ? 'Please provide description and amount.' : ''
        }))
        if(!isInValid)
        {
            this.props.onSave({
                description : this.state.description,
                amount : parseFloat(this.state.amount) * 100,
                createdAt : this.state.createdAt.valueOf(),
                note : this.state.note
            });
        }
    }
    render(){
        return (
            <div>
               <form onSubmit={this.onSubmit}>
                    { this.state.errors && <p>{this.state.errors}</p>}
                   <input
                       type="text"
                       autoFocus
                       placeholder = "Description"
                       value= { this.state.description }
                       onChange= {this.onChangeDescription}
                   />
                     <input
                       type="number"
                       placeholder = "Amount"
                       value= { this.state.amount }
                       onChange= {this.onChangeAmount}
                   />
                   <SingleDatePicker
                       date={this.state.createdAt}
                       onDateChange = {this.onDateChange}
                       focused = { this.state.calendarFocused }
                       onFocusChange = {this.onFocusChange}
                       numberOfMonths = {1}
                       isOutsideRange = {()=> false }
                   />
                    <textarea
                       type="text"
                       placeholder = "Notes"
                       value= { this.state.note }
                       onChange= {this.onChangeNotes}
                   />
                    <button>Add Expense</button>
               </form>
            </div>
        );
    }
}