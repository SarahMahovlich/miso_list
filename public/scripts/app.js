// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(document).ready(function() {
$('.bookSlide').click(() => {
  $('.bookSection').slideToggle();
});

$('.movieSlide').click(() => {
  $('.movieSection').slideToggle();
});

$('.prodSlide').click(() => {
  $('.prodSection').slideToggle();
});

$('.restSlide').click(() => {
  $('.restSection').slideToggle();
});

$('.miscSlide').click(() => {
  $('.miscSection').slideToggle();
});

$('.archiveSlide').click(() => {
  $('.archiveSection').slideToggle();
});

});
