/*global define*/

define([
    'jquery'
], function ($) {
  $.fn.slideIt = function(options){
    this.each(function(){
      var $this = $(this);
      var options = $.extend({
          current: 0,
          nav: $this.find('nav li'),
          main: $this.find('> ul li'),
          length: null
      }, options);

      options.length = options.main.length;

      var goToSlide = function(event){
          if(event.data.index == options.current) return; 

          options.nav.eq(options.current).removeClass('active');
          options.main.eq(options.current).removeClass('active');
          options.current = event.data.index;
          options.nav.eq(options.current).addClass('active');
          options.main.eq(options.current).addClass('active');
      }
      
      var goToNextSlide = function(event){
        options.nav.eq(options.current).removeClass('active');
        options.main.eq(options.current).removeClass('active');

        if(options.current == options.length - 1) options.current = 0;
        else options.current++;     
        
        options.nav.eq(options.current).addClass('active');
        options.main.eq(options.current).addClass('active');
      }

      options.nav.each(function(index){
        $(this).on('click', {index: index}, goToSlide);
      });

      options.main.on('click', goToNextSlide);
    });
  }
});
