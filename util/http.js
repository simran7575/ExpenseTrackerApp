import axios from 'axios';
const BACKEND_URL = 'https://react-native-ade41-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData){
    const response = await axios.post(BACKEND_URL+'/expense.json', expenseData);
    const id = response.data.name;
    return id;
}

export async function getExpenses(){
    const promise = await axios.get(BACKEND_URL + '/expense.json');
    const expenses = [];
    for(const key in promise.data){
        const expenseData = {
            id : key,
            amount: promise.data[key].amount,
            date: new Date(promise.data[key].date),
            description : promise.data[key].description
        }
        expenses.push(expenseData);
        
    }
    return expenses;
}

export function updateExpense(id, expenseData){
    return axios.put(BACKEND_URL+`/expense/${id}.json`, expenseData)
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL+`/expense/${id}.json`)
}