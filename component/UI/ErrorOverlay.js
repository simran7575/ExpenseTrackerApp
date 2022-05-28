import {View, Text, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

function ErrorOverlay({error, onConfirm}){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>An Error Occured</Text>
            <Text style={styles.text}>{error}</Text>
            <Button onPress={onConfirm}>Okay </Button>
        </View>
    )

}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor:GlobalStyles.colors.primary700
    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    text:{
        textAlign:"center",
        color:"white",
        marginBottom:8
    }
})

export default ErrorOverlay;