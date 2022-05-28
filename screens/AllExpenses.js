import { useContext } from 'react';
import {StyleSheet } from 'react-native';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

// create a component
function AllExpenses() {
    const expenseCtx = useContext(ExpensesContext);
    return (
       <ExpensesOutput expenses = {expenseCtx.expenses} expensesPeriod='Total' fallbackText='No Expenses found!'/>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AllExpenses;
