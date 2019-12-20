$(function () {
   // Slider height
   let windowHeight = $(window).height()
   let upperbarHeight = $('.top-bar').innerHeight()
   let navHeight = $('.navbar').innerHeight()

   $('.slider, .carousel').height(windowHeight - (upperbarHeight + navHeight))
})