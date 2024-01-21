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


//Each time block consists of a row with three columns: an hour column, a description column, and a save button column. 
//The hour column displays the time in 12-hour format (AM/PM), and the description column is a textarea where users can enter notes.

function createTimeblock(hour) {
  var timeofDay = hour >= 12 ? 'PM' : 'AM';
  var displayHour = hour % 12 || 12;
  return `
      <div id="${hour}" class="row time-block">
          <div class="col-md-1 hour">
              ${displayHour}:00 ${timeofDay}
          </div>
          <textarea class="col-md-10 description"></textarea>
          <button class="btn saveBtn col-lg-1"><i class="fas fa-save"></i></button>
      </div>
  `;
}
//The Array.from() method is used to create an array of hours from 8 to 17, 
//and the .map() method is used to apply the createTimeBlock() function to each hour in the array. 
//The resulting array of HTML strings is then joined into a single string and appended to the '.container' element on the page.

var hours = Array.from({length: 10}, (_, i) => i + 8); 
var timeBlock = hours.map(hour => createTimeblock(hour)).join('');
$('.container').append(timeBlock);

// for loop allows the code the efficient when retrieving values for each hour from local storage
//i is initialized from hour 8 until 5pm
for (var i = 8; i <= 17; i++) {
  var hour = "#" + i;
  $(hour + " .description").val(localStorage.getItem(i.toString()));
}

//this portion of the code gets the current system time using day.js and iterates over 
//each time block element on the page. 
//For each time block, it compares the block's hour with the current hour. 
//Depending on the result, it adds or removes certain CSS classes to the time block:
//if the block's hour is less than the current hour, the class "past" class is added and "future" and "present" classes are removed.
//If the block's hour is equal to the current hour, the class "present" is added and  "past" and "future" classes are removed.
//Otherwise, the "present" and "past" classes are removed and added the "future" class. 

function calendarInteractivity() {
  var currentTime = dayjs().hour(); 

  $(".time-block").each(function () {
      var $this = $(this);
      var blockHour = parseInt($this.attr("id"));
      blockHour < currentTime ? $this.addClass("past").removeClass("future").removeClass("present") :
      blockHour === currentTime ? $this.removeClass("past").addClass("present").removeClass("future") :
      $this.removeClass("present").removeClass("past").addClass("future");
  })
}
calendarInteractivity(); 
});
