import { View, Text, StyleSheet} from "react-native";
import { GlobalStyles } from "../../constants/styles";

function ExpensesSummary({expenses, period}){
    const expensesSum = expenses.reduce((sum, expenses)=>{
        return sum = sum + expenses.amount;
    },0)
    return(
        <View style={styles.container}>
            <Text style={styles.periodText}>{period}</Text>
            <Text style={styles.sumText}>${expensesSum.toFixed(2)}</Text>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        padding:8,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius:10
    },
    periodText:{
       fontSize:12,
       color:GlobalStyles.colors.primary400
    },
    sumText:{
        fontSize:16,
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    }
})

export default ExpensesSummary;