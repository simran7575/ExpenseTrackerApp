import { Pressable, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Button({children, onPress, style, flat}){
    return(
        <View style={style}>
            <Pressable onPress={onPress} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.buttonContainer, flat=='flat' && styles.flatContainer]}>
                    <Text style={[styles.buttonText, flat == 'flat' && styles.flatText]}>{ children }</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer:{
        backgroundColor:GlobalStyles.colors.primary500,
        padding:8,
        borderRadius:4 ,
      
    },
    flatContainer:{
        backgroundColor:"transparent"
    },
    buttonText:{
        color: "white",
        textAlign:"center"
    },
    flatText:{
        color:GlobalStyles.colors.primary200
    },
    pressed:{
        opacity:0.6,
        backgroundColor:GlobalStyles.colors.primary100,
        borderRadius:4
    }

})

export default Button;