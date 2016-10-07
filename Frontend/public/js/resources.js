'use strict';

$(document).ready(function () {
  $('.topnav li a').on('click', function () {
    $('.topnav').removeClass('responsive');
  });
});

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function displayNav() {
  document.getElementsByClassName("topnav")[0].classList.toggle("responsive");
}

$(window).scroll(function () {
  if ($(this).scrollTop() > $(window).height()) {
    $('#scrollToTop').fadeIn('slow');
  } else {
    $('#scrollToTop').fadeOut('slow');
  }
});

$("#scrollToTop").click(function () {
  $('html, body').animate({scrollTop: 0}, 'slow');
});
