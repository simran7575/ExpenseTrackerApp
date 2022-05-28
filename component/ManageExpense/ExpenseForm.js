import { useState} from 'react';
import Input from "./Input";
import {View, StyleSheet, Text, Alert} from 'react-native';
import Button from '../UI/Button';
import {getFormattedDate} from '../../util/date'
import { GlobalStyles } from '../../constants/styles';


function ExpenseForm({cancelHandler, confirmButtonText, confirmHandler, defaultValues}){
    const [inputs, setInputs] = useState({
        amount: {value: defaultValues? defaultValues.amount.toString():'', isValid:true},
        description: {value:defaultValues? defaultValues.description:'' , isValid:true},
        date: {value:defaultValues? getFormattedDate(defaultValues.date) : '', isValid:true}
    });

    function expenseChangeHandler(expenseIdetifier, enteredValue){
        setInputs((currentValue)=>{
            return {...currentValue, [expenseIdetifier] : {value: enteredValue, isValid:true}}
        })
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount>0;
        const dateIsValid =  expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;
        if(!amountIsValid || !dateIsValid || !descriptionIsValid){
            setInputs((currentInputs) => {return{
                amount:{value: currentInputs.amount.value, isValid: amountIsValid},
                date:{value: currentInputs.date.value, isValid: dateIsValid},
                description:{value: currentInputs.description.value, isValid: descriptionIsValid}

            }})
            return;
        }
        confirmHandler(expenseData)
    }
    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid ;


    return(
        <View style={styles.rootContainer}>
            <Text style={styles.titleText}>Your Expense</Text>
            <View style={styles.container}>
            <Input  
                label='Amount' 
                style={styles.input}
                isValid= {inputs.amount.isValid}
                textInputConfig={{
                keyboardType:'decimal-pad',
                onChangeText: expenseChangeHandler.bind(this, 'amount'),
                value:inputs.amount.value
            }}/>
            <Input label='Date' 
                style={styles.input}
                isValid= {inputs.date.isValid}
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength:10,
                    onChangeText: expenseChangeHandler.bind(this, 'date'),
                    value:inputs.date.value
            }}/>
            </View>
            <Input label='Description' 
                    isValid= {inputs.description.isValid}
                    textInputConfig={{
                        multiline: true,
                        onChangeText: expenseChangeHandler.bind(this, 'description'),
                        value:inputs.description.value
            }}/>
            {formIsInvalid && (<Text style={styles.alertText}>Invalid input values - please check your input data.</Text>)}
             <View style={styles.buttonContainer}>
                <Button flat='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
                <Button style={styles.button} onPress={ submitHandler}>{confirmButtonText }</Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between"

    },
    input:{
        flex:1
    },
    rootContainer:{
        marginTop:40
    },
    titleText:{
        fontSize:24,
        color:"white",
        fontWeight:'bold',
        textAlign:"center",
        marginVertical:24
    },
    buttonContainer:{
        flexDirection:'row',
        justifyContent:"center",
        alignItems:"center"
    },
    button:{
        minWidth:120, 
        marginHorizontal:8
    },
    alertText:{
        textAlign:"center",
        margin :8,
        color: GlobalStyles.colors.error500
    },
   
})

export default ExpenseForm;