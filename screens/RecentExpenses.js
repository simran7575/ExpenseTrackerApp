import { useContext, useEffect, useState } from 'react';
import {  StyleSheet } from 'react-native';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../component/UI/ErrorOverlay';
import LoadingOverlay from '../component/UI/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { dateMinusDay } from '../util/date';
import { getExpenses } from '../util/http';

function RecentExpenses(){
    const [isLoading, setIsLoading ] = useState(true);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);


    useEffect(()=>{
        async function getExpenseData(){
           setIsLoading(true);
           try{
            const expenses =  await getExpenses();
            setIsLoading(false);
            expenseCtx.setExpense(expenses)
           }
           catch(error){
               setError('Could not fetch expenses')
           }
       
        }
        getExpenseData()

    }, []);

    function errorHandler(){
        setError(null);
    }
    if(error && !isLoading){
        <ErrorOverlay error={error} onConfirm={errorHandler}/>
    }

    if(isLoading){
        return(
            <LoadingOverlay/>
        )
    }
    const recentExpenses = expenseCtx.expenses.filter(expense => {
        const today = new Date();
        const lastweekDate = dateMinusDay(today,7);
        return expense.date > lastweekDate;
    })
    return (
        <ExpensesOutput 
            expenses={recentExpenses} 
            expensesPeriod='Last 7 days'
            fallbackText='No expenses in last 7 days'/>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});


export default RecentExpenses;
