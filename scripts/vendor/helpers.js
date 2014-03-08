/*global define*/

define(function() {
  var helpers = {
    init: function(){},

    hasClass: function(el, c){
      if(el.classList){ return el.classList.contains(c); }
      else { return new RegExp('(^| )' + c + '( |$)', 'gi').test(el.c); }
    },

    addClass: function(el, c){
      if(!helpers.hasClass(el, c)){ 
        if(el.classList){ el.classList.add(c); }
        else { el.className += ' ' + c; }
      }
    },

    removeClass: function(el, c){
      if(typeof el != 'undefined'){
        if(typeof c == 'undefined'){ 
          var classes = el.getAttribute('class');
          if(classes){ 
            classes = classes.split(' '); 
            classes.forEach(function(c, i){
              if(el.classList){ el.classList.remove(c); }
              else { el.className = el.className.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
            });
          }
        } else if(helpers.hasClass(el, c)){
          if(el.classList){ el.classList.remove(c); }
          else { el.className = el.className.replace(new RegExp('(^|\\b)' + c.split(' ').join('|') + '(\\b|$)', 'gi'), ' '); }
        }
      }
    }
  } 
  return helpers;
});
