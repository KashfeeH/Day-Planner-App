//The ready function is fired once the DOM is ready
//day.js is used to display the current time and date when the user opens the page
//the on"click" function listens for the click on the elements with class saveBtn
//where two variables are declared entry and time. In summary when the saveBtn is
//clicked, the value in those fields are stored in local storage.


$(document).ready(function () {
  $("#currentDay").text(dayjs().format("D MMMM YYYY, HH:mm:ss a")); 

  $(document).on("click", ".saveBtn", function () {
    var entry = $(this).siblings(".description").val(); 
    var time = $(this).parent().attr("id").toString(); 
    localStorage.setItem(time, entry);})
});