function modifyDate(date) {
    if (date[6] == "-") {
        date = date.slice(0, 5) + "0" + date.slice(5);
    }
    if (date.length == 9) {
        date = date.slice(0, 8) + "0" + date.slice(8);
    }
    return date;
}
function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
const today = new Date();
const minDate = modifyDate(today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate());
const dateAfter60Days = addDays(minDate, 60);
const maxDate = modifyDate(dateAfter60Days.getFullYear() + '-' + (dateAfter60Days.getMonth() + 1) + '-' + dateAfter60Days.getDate());
$("#playdate").attr("min", minDate);
$("#playdate").attr("max", maxDate);
const url = "https://random-data-api.com/api/address/random_address"
const response = fetch(url);
console.log(response);

