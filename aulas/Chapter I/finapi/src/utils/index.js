exports.date_formatted_pt_br = (date) => {
    dateConversion = new Date(date);

    day  = dateConversion.getDate().toString().padStart(2, '0'),
    month  = (dateConversion.getMonth()+1).toString().padStart(2, '0'),
    year  = dateConversion.getFullYear();
    
    return day + "/" + month + "/" + year;
}