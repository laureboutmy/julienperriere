/*global define*/

define([
    'vendor/helpers'
], function (helpers) {
  var slideIt = function(elements){
    Array.prototype.forEach.call(elements, function(el, i){
      var options = {
        current: 0,
        nav: el.querySelectorAll('nav li'),
        main: el.parentNode.querySelectorAll('.slider > div ul li'),
        length: null
      };

      options.length = options.main.length;

      var goToSlide = function(i){
        if(i == options.current) return;

        helpers.removeClass(options.nav[options.current], 'active');
        helpers.removeClass(options.main[options.current], 'active');
        options.current = i;
        helpers.addClass(options.nav[options.current], 'active');
        helpers.addClass(options.main[options.current], 'active');
      }

      var goToNextSlide = function(i){
        helpers.removeClass(options.nav[options.current], 'active');
        helpers.removeClass(options.main[options.current], 'active');
        if(options.current == options.length - 1) options.current = 0;
        else options.current++;
        helpers.addClass(options.nav[options.current], 'active');
        helpers.addClass(options.main[options.current], 'active');
      }

      Array.prototype.forEach.call(options.nav, function(el, i){
        el.addEventListener('click', function(){ goToSlide(i) })
      });

      Array.prototype.forEach.call(options.main, function(el, i){
        el.addEventListener('click', function(){ goToNextSlide(i) })
      });



    });
  }
  return slideIt;
});
