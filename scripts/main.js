/*global require*/
// 'use strict';

require.config({
  shim: {
    underscore: {
        exports: '_'
    },
    backbone: {
        deps: [
            'underscore',
            'jquery'
        ],
        exports: 'Backbone'
    }, 
    imagesloaded: {
      deps: [
        'eventEmitter',
        'eventie'
      ],
      exports: 'imagesLoaded'
    }
  },
  paths: {
    jquery: '../components/jquery/jquery',
    backbone: '../components/backbone/backbone',
    underscore: '../components/underscore/underscore',
    eventEmitter: '../components/eventEmitter/EventEmitter',
    eventie: '../components/eventie/eventie',
    imagesloaded: '../components/imagesloaded/imagesloaded',
    text: '../components/requirejs-text/text',
    requirejs: '../components/requirejs/require',
  }
});


define(['julien-perriere', 'jquery'], function(J, $){
  J.start();
})




// require([
//   'jquery'
// ], function(jquery){

//   var JulienPerriere = JulienPerriere || {
//     canScroll: true
//   }

//   $.fn.slideIt = function(options){
//     this.each(function(){
//       var $this = $(this);
//       var options = $.extend({
//           current: 0,
//           nav: $this.find('nav li'),
//           main: $this.find('> ul li'),
//           length: null
//       }, options);

//       options.length = options.main.length;

//       var goToSlide = function(event){
//           if(event.data.index == options.current) return; 

//           options.nav.eq(options.current).removeClass('active');
//           options.main.eq(options.current).removeClass('active');
//           options.current = event.data.index;
//           options.nav.eq(options.current).addClass('active');
//           options.main.eq(options.current).addClass('active');
//       }
//       var goToNextSlide = function(event){
//         options.nav.eq(options.current).removeClass('active');
//         options.main.eq(options.current).removeClass('active');

//         if(options.current == options.length - 1) options.current = 0;
//         else options.current++;     
        
//         options.nav.eq(options.current).addClass('active');
//         options.main.eq(options.current).addClass('active');
//       }

//       options.nav.each(function(index){
//         $(this).on('click', {index: index}, goToSlide);
//       });

//       options.main.on('click', goToNextSlide);
//     });
//   }

//   $('section.slider').slideIt();



//   $('#main').on('click', '#next-project', function(e){
//     e.preventDefault();
//     var $this = $(this);
//     var $article = $this.parent().find('article.project');
//     // console.log($(document).height());
//     $('body').scrollTop($(document).height());
//     $article.offset({ top: -($(window).height() - 350) });
//     $this.height('100%');
//     setTimeout(function(){
//       $article.remove();
//       $('body').scrollTop('0');
//       $.ajax('views/' + $this.data('url') + '', {
//         success: function(data){
//           $this.parent().html(data);
//         }
//       });
//     }, 500);
//   });

//   JulienPerriere.onWindowScroll = function(e){
//     var self = this;
//     if(!self.canScroll) e.preventDefault();
//   }

//   function onResize(){
//     $('#main').width($(window).width() - 80);
//   }
//   /* LISTENERS */
//   $(window).on('resize', onResize);
//   $(window).on('mousewheel', function(e){
//     console.log('e')
//   });
//   $('section#sidebar').on('mouseover', function(){
//     $('div#wrapper').addClass('unwound'); });
//   $('section#sidebar').on('mouseout', function(){
//     $('div#wrapper').removeClass('unwound'); });
//   $('nav#infos').on('click', function(){
//     $('div#wrapper').toggleClass('open'); });
//   $('section#main').on('click', function(){
//     $('div#wrapper').removeClass('open'); });

//   $('header#header').on('click', function(){
//     $('div#wrapper').addClass('hidden'); });
  
//   $('section#loader h1').on('click', function(){
//     console.log('hey');
 
//     $('div.progress').addClass('completed');
    
//   })
//   /* INITIALIZATION */
//   onResize();
// })