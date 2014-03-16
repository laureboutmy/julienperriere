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
        document.body.scrollTop = document.documentElement.scrollTop = 0;

      },

      launchLoader: function(){
        helpers.removeClass(document.getElementById('loader'), 'hidden');
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
          });
        }, 500);
      },

      hideLoader: function(){
        var wrapper = document.getElementById('wrapper'),
            loader = document.getElementById('loader');
        helpers.removeClass(wrapper, 'hidden');
        setTimeout(function(){ helpers.removeClass(loader, 'visible') }, 200);
        setTimeout(function(){ helpers.addClass(loader, 'hidden') }, 300);
        setTimeout("loader.querySelectorAll('h1 div.progress')[0].style.height = 0;", 500);
        setTimeout(function(){ helpers.removeClass(loader, J.Status.currentView) }, 500);
      },

      // When you click on the bottom of a case study, this function will be called
      renderChangeFromBottom: function(project){
        var self = this,
            main = document.getElementById('main');

        helpers.addClass(main.querySelector('nav#next-project'), 'active');
        main.querySelector('article.project').style.top = -(window.innerHeight - 350) + 'px';
        helpers.addClass(loader, project);
        setTimeout(function(){ 
          helpers.removeClass(loader, 'hidden'); }, 300);
      },

      destroy: function(){ window.removeEventListener('scroll', function(){}); },


      initAnimations: function(){
        var main = document.getElementById('main');
        helpers.addClass(main.querySelectorAll('header.introduction')[0], 'animate');
      },

      // Everytime you scroll, this function is called
      renderAnimations: function(coords, delta){
        var self = this,
            animations = self.animations,
            ratio = J.Status.windowH * 2/3,
            main = document.getElementById('main');

        animations.forEach(function(animation, i){
          if(delta < 0){
            if(animation.position - ratio < coords && !animation.animated){
              animation.animated = true;
              helpers.addClass(main.querySelectorAll(animation.selector)[0], animation.c);
            }
          } else if(delta > 0){
            if(animation.position > coords && animation.animated){
              animation.animated = false;
              helpers.removeClass(main.querySelectorAll(animation.selector)[0], animation.c);
            }
          }
        })
      }
    });

    return projectView;
});
