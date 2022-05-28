import { useContext, useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../component/UI/Button';
import IconButton from '../component/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../component/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../component/UI/LoadingOverlay';
import ErrorOverlay from '../component/UI/ErrorOverlay';


function ManageExpense ({navigation, route}) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const expenseId = route.params?.expenseId;
    const isEdited = !! expenseId;


   useLayoutEffect(()=>{
       navigation.setOptions({
           title: isEdited ? 'Edit Expense' : 'Add Expense'
       })
   },[]);


   const expenseCtx = useContext(ExpensesContext);

   const requiredExpense = expenseCtx.expenses.find(expense => expense.id == expenseId)

   async function deleteExpenseHandler(){
        setIsLoading(true);
       try{
        await deleteExpense(expenseId);
        expenseCtx.deleteExpense(expenseId);
        navigation.goBack();
       }
       catch(error){
        setError('Could not delete expense- please try again later.');
        setIsLoading(false);
       }
       
   }
   function cancelHandler(){
       navigation.goBack();
   }

   async function confirmHandler(expenseData){
        setIsLoading(true);
       try{
        if(isEdited){
            expenseCtx.updateExpense(  expenseId, expenseData)
             await updateExpense(expenseId, expenseData)  
        }
        else{
            const id =  await storeExpense(expenseData)
            expenseCtx.addExpense(
               {...expenseData, id: id}
             )
        }
        navigation.goBack();
       }
       catch(error){
        setError('Could not save data- please try again later!');
        setIsLoading(false);
       }
      
   }
   function errorHandler(){
       setError(null);
   }

   if(error && !isLoading){
       <ErrorOverlay error={error} onConfirm={errorHandler}/>
   }

   if(isLoading){
       return <LoadingOverlay/>
   }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                cancelHandler={cancelHandler} 
                confirmButtonText={isEdited ? "Edit" : 'Add'} 
                confirmHandler={confirmHandler}
                defaultValues= {requiredExpense}/>
           
            {isEdited && (
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash' size={34} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}/>
                </View>

            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer:{
        marginTop:16,
        paddingTop:12,
        alignItems:"center",
        borderTopColor:GlobalStyles.colors.primary100,
        borderTopWidth:2
    },
   
});


export default ManageExpense;
