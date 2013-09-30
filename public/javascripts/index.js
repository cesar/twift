$(document).ready(function () {
  $('form').on('submit', function(event) {
    event.preventDefault();
    $.get('/' + $('#giftee').val(), function(data) {
      console.log(data);
    });
  });
});