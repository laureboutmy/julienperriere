/*global define*/

define([
    'jquery',
    'backbone', 
    'imagesloaded',
    'models/project',
    'vendor/helpers'
], function ($, Backbone, imagesLoaded, Project, helpers) {
    // 'use strict';
    var projectView = Backbone.View.extend({
      el: '#main',
      animations: {},
      initialize: function(){
        var self = this;
        console.log('project View', self);
        self.render();
        self.on('loaded', function(){
          setTimeout(self.hideLoader, 1000);
          setTimeout(self.initAnimations, 1000);
        });

      },

      launchLoader: function(){
        helpers.addClass(document.getElementById('loader'), 'hidden');
        // $('section#loader').removeClass('hidden');
      },

      load: function(){
        var self = this,
            wrapper = document.getElementById('wrapper'),
            main = document.getElementById('main'),
            loader = document.getElementById('loader'),
            images = main.getElementsByTagName('img');

        helpers.removeClass(loader);
        helpers.addClass(loader, J.Status.currentView); 
        setTimeout(function(){ helpers.addClass(wrapper, 'hidden') }, 100);
        setTimeout(function(){ helpers.addClass(loader, 'visible') }, 200);
        // $('section#loader').removeClass().addClass(J.Status.currentView);
        // setTimeout("$('div#wrapper').addClass('hidden')", 100);
        // setTimeout("$('section#loader').addClass('visible')", 200);
        setTimeout(function(){ 
          var loading = imagesLoaded(images),
              loaded = 0,
              progress = document.querySelectorAll('section#loader div.progress')[0];
          loading.on('always', function(){
            setTimeout("J.Views[J.Status.currentView].trigger('loaded')", 300);
          });
          loading.on('progress', function() {
            loaded++;
            progress.style.height = loaded / images.length * 100 + '%';
            // $('section#loader div.progress').height(loaded/images.length*100 + '%');
          });
        }, 500);
      },

      hideLoader: function(){
        var wrapper = document.getElementById('wrapper'),
            loader = document.getElementById('loader');
        helpers.removeClass(wrapper, 'hidden');
        // setTimeout(function(){ helpers.addClass(loader, 'complete') }, 100);
        setTimeout(function(){ helpers.removeClass(loader, 'visible') }, 200);
        setTimeout(function(){ helpers.addClass(loader, 'hidden') }, 300);
        setTimeout("loader.querySelectorAll('h1 div.progress')[0].style.height = 0;", 500);
        // $('div#wrapper').removeClass('hidden');
        // setTimeout("$('section#loader').addClass('complete')", 100);
        // setTimeout("$('section#loader').removeClass('visible')", 200);
        // setTimeout("$('section#loader').addClass('hidden')", 300);
        // setTimeout("$('section#loader h1 div.progress').height(0)", 500);
      },

      // When you click on the bottom of a case study, this function will be called
      renderChangeFromBottom: function(){
        var self = this,
            main = document.getElementById('main');
            // $main = $('section#main');

        J.Status.canScroll = false;
        helpers.addClass(main.querySelectorAll('nav#next-project')[0], 'active');
        main.querySelectorAll('article.project')[0].offsetTop = window.innerHeight;
        // $main.find('nav#next-project').addClass('active');
        // $main.find('article.project').offset({ top: -($(window).height() - 350) });
      },

      destroy: function(){ $(window).off('scroll DOMMouseScroll MozMousePixelScroll'); },


      initAnimations: function(){
        // $('section#main').find('ul.meta').addClass('visible');
        // $('section#main').find('header.introduction h1').addClass('visible');
        var main = document.getElementById('main');
        helpers.addClass(main.querySelectorAll('header.introduction')[0], 'animate');
        // $('section#main').find('header.introduction').addClass('animate');
        // setTimeout("$('section#main').find('ul.meta').addClass('visible')", 300);
        // setTimeout("$('section#main').find('header.introduction h1').addClass('visible')", 400);
      },

      // Everytime you scroll, this function is called
      renderAnimations: function(coords, delta){
        var self = this;
        var animations = self.animations;
        var ratio = J.Status.windowH * 2/3;
        $.each(animations, function(index, animation){
          if(delta < 0){
            if(animation.position - ratio < coords && !animation.animated){
              animation.animated = true;
              $(animation.selector).addClass(animation.c);
            }
          } else if(delta > 0){
            if(animation.position > coords && animation.animated){
              animation.animated = false;
              $(animation.selector).removeClass(animation.c);
            }
          }
        })
      }
    });

    return projectView;
});
