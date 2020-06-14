const selectedTotal = (expenses)=>{
    return expenses
            .map( (exp) => exp.amount)
            .reduce((sum,value)=> sum + value,0);
}

export default selectedTotal;