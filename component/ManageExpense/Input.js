import {Text , View, StyleSheet, TextInput } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({label, textInputConfig, style, isValid}){

    const inputStyles = [styles.input];

    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputmultiline)
    }
    if(!isValid){
        inputStyles.push(styles.invalidInput)
    }
    return(
        <View style={[styles.inputContainer, style]}>
        <Text style={[styles.label,!isValid &&styles.invalidLabel]}>{label}</Text>
        <TextInput style={inputStyles} {...textInputConfig}/>
        </View>
    )

}

const styles= StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8
    },
    label:{
        fontSize:12,
        color: GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        padding:6,
        borderRadius:4,
        color:GlobalStyles.colors.primary700,
        fontSize:18
      },
      inputmultiline:{
          minHeight:100,
          textAlignVertical:'top'
      },
      invalidLabel:{
        color: GlobalStyles.colors.error500
    },
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50
    }

    }
);

export default Input;