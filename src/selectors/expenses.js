import moment from 'moment';
// GET visible store
const getExpenseVisible = (expense,{ text,sortBy,startDate,endDate })=>{
    return expense.filter((exp)=>{
        const dateOfMoment = moment(exp.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(dateOfMoment,'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(dateOfMoment,'day') : true;
        const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());

        return startDateMatch && endDateMatch && textMatch;
    }).sort((a,b)=>{
        if(sortBy == 'date'){
            return a.createdAt < b.createdAt ? 1: -1;
        }
        if(sortBy == 'amount'){
            return a.amount < b.amount ? 1 : -1
        }
    });
};

export default getExpenseVisible;