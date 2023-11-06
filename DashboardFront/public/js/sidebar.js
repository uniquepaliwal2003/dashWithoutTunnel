$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});


const currentDate = new Date();
const startDate = new Date(currentDate.getFullYear(), 0, 1); 
const startDateString = startDate.toISOString().slice(0, 10); 
const startDateInputs = document.querySelectorAll('.startDateRange');
startDateInputs.forEach(input => {
  input.value = startDateString;
});
const endcurrentDate = new Date();
const endcurrentDateString = currentDate.toISOString().slice(0, 10);
const endstartDateInputs = document.querySelectorAll('.endDateRange');
endstartDateInputs.forEach(input => {
  input.value = endcurrentDateString;
});
