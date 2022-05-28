import {View, ActivityIndicator, StyleSheet} from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function LoadingOverlay(){
    return(
    <View style={styles.indicator}>
        <ActivityIndicator size='large' color='white'/>
    </View>
    )
}

const styles= StyleSheet.create({
    indicator:{
        flex:1,
        padding :24,
        backgroundColor: GlobalStyles.colors.primary700,
        justifyContent:"center",
        alignItems:"center"

    }
})

export default LoadingOverlay;