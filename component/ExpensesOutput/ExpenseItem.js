import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import { getFormattedDate } from '../../util/date';


function ExpenseItem({id, description, amount, date}){

    const navigation = useNavigation();

    function handleExpenseHandler(){
        navigation.navigate("ManageExpense", {expenseId : id})
    }
    return(
    <Pressable style={({pressed})=> pressed && styles.pressed} android_ripple={{color:GlobalStyles.colors.primary800}}
        onPress={handleExpenseHandler}>
        <View style={styles.container}>
            <View >
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.date}>{getFormattedDate(date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount}</Text>
            </View>
        </View>
    </Pressable>
    )
}

const styles =StyleSheet.create({
    pressed:{
        opacity:0.6
    },
    container:{
        backgroundColor: GlobalStyles.colors.primary500,
        padding:12,
        marginVertical:8,
        borderRadius:8,
        flexDirection:"row",
        justifyContent:"space-between",
        elevation:5,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOffset:{'height':1,'width':1},
        shadowRadius:8,
        shadowOpacity:0.4
    },
    description:{
        fontSize:16,
        color:GlobalStyles.colors.primary50,
        fontWeight:"bold",
        marginBottom:4
    },
    date:{
        color:GlobalStyles.colors.primary50
    },
    amountContainer:{
        backgroundColor:"white",
        borderRadius:4,
        paddingHorizontal:8,
        paddingVertical:10,
        justifyContent:"center" ,
        alignItems:"center"  ,
        minWidth:80 
},
amount:{
    fontSize:16,
    color:GlobalStyles.colors.primary500,
    fontWeight:"bold"
}


});

export default ExpenseItem;