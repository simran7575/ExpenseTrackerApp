export function getFormattedDate(date){
    return date.toISOString().slice(0,10);
}

export function dateMinusDay(date, day){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()-day)
}