$(document).ready(function () {
 // Open modal when project is clicked
 $('.project').click(function () {
     const modalId = $(this).data('modal');
     $('#' + modalId).fadeIn();
 });


 // Close modal when close button is clicked
 $('.close-btn').click(function () {
     const modalId = $(this).data('modal');
     $('#' + modalId).fadeOut();
 });


 // Close modal when clicked outside of modal content
 $(window).click(function (event) {
     $('.modal').each(function () {
         if ($(event.target).is(this)) {
             $(this).fadeOut();
         }
     });
 });
});


