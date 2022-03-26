exports.getDate = function(){

    let today = new Date();

    let options = {
    weekday : "long",
    day: "numeric",
    month: "long"
    }// end of options

    return today.toLocaleDateString("en-US",options);
}// END OF FUNCTION
