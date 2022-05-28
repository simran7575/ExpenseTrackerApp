import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from "../../constants/styles";

function IconButton({icon, color, size, onPress}){
    return(
        <Pressable 
            onPress={onPress} 
            style={({pressed}) => pressed && styles.iconPressed}> 

            <View style={styles.iconContainer}>
                <Ionicons name={icon} size={size} color={color} />
            </View>
        </Pressable>
    )}

const styles = StyleSheet.create({
    iconPressed:{
        opacity:0.7
    },
    iconContainer:{
        borderRadius:24,
        marginHorizontal:12,
        marginVertical:2,
        padding:5
    }
})    

export default IconButton;