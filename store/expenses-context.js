import { createContext, useReducer } from "react";
import { add } from "react-native-reanimated";


export const ExpensesContext = createContext({
    expenses:[],
    addExpense : ({description, amount, date }) => {} ,
    setExpense : (expenses) =>{},
    deleteExpense: (id) => {},
    updateExpense : (id, {description, amount, date})  => {}
});

function expenseReducer(state, action){
    
    switch(action.type){
        case 'ADD':
            return [{...action.payload},...state];
        case 'SET':
            const inverted = action.payload.reverse()
            return inverted;
        case 'UPDATE':
            const expenseIndex = state.findIndex(expense => expense.id == action.payload.id);
            const requiredExpense = state[expenseIndex];
            const updatedExpense = {...requiredExpense, ...action.payload.data};
            const updatedState = [...state];
            updatedState[expenseIndex] = updatedExpense;
            return updatedState;

        case 'DELETE':
            return state.filter(expense => expense.id !== action.payload ); 
        default:
            return state;

        
    }
    
}


function ExpensesContextProvider({children}){
    const [expensesState, dispatch] = useReducer(expenseReducer, []);

    function addExpense(data){
        dispatch({
            type: "ADD",
            payload: data
        })
    }
    function setExpense(expenses){
        dispatch({
            type:'SET',
            payload:expenses
        })
    }

    function deleteExpense(id){
        dispatch({
            type: "DELETE",
            payload: id
        })
    }

    function updateExpense(id, data){
        dispatch({
            type: "UPDATE",
            payload: {id: id, data :data}
        })
    }

    const value={
        expenses : expensesState,
        addExpense:addExpense,
        setExpense: setExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;