import { StatusBar } from 'expo-status-bar';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import ManageExpense from './screens/ManageExpense';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './component/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ExpenseOverView(){
  return(
    <>
    <StatusBar style='light'/>
    <Tab.Navigator 
      screenOptions={({navigation}) => (
        {headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor:"white",
        tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
        tabBarActiveTintColor:GlobalStyles.colors.accent500,
        tabBarActiveBackgroundColor:GlobalStyles.colors.primary400,
        tabBarIconStyle: {color:GlobalStyles.colors.error50},
        headerRight: ({tintColor}) => <IconButton icon='add' color={tintColor} size={38} onPress= {()=>navigation.navigate("ManageExpense")}/>
      })}>
        <Tab.Screen name="RecentExpenses" component={RecentExpenses}
        options={{
          title: 'Recent Expenses', 
          tabBarLabel:"Recent",
          tabBarIcon : ({size,color})=><Ionicons name='hourglass-outline' color={color} size={size}/>}}/>
        <Tab.Screen name="AllExpenses" component={AllExpenses}
        options={{
          title: 'All Expenses', 
          tabBarLabel:"All Expenses",
          tabBarIcon : ({size,color})=><Ionicons name='calendar' color={color} size={size}/>}} />
  </Tab.Navigator>
  </>
  )
}
export default function App() {




  return (
    <>
    <ExpensesContextProvider>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{headerStyle:{backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor:"white",}}>
   <Stack.Screen name="ExpenseOverView" component={ExpenseOverView} options={{headerShown:false}}/>
   <Stack.Screen name="ManageExpense" component={ManageExpense} options={{title:"Manage Expense", presentation:"modal"}}/>

   </Stack.Navigator>
   </NavigationContainer>
   </ExpensesContextProvider>
   </>
  );
}

const styles = StyleSheet.create({

});
