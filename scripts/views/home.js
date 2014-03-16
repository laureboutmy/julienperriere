/*global define*/

define([
    'backbone', 
    'imagesloaded',
    'text!templates/home.html',
    'vendor/helpers'
], function (Backbone, imagesLoaded, tplHome, helpers) {
    'use strict';
    var homeView = Backbone.View.extend({
      el: '#main',
      template: _.template(tplHome),
      animations: {},
      initialize: function(){
        var self = this;
        console.log('home View', self);
        self.render();
        self.on('loaded', function(){
          setTimeout(self.hideLoader, 1000);
        });

      },
      render: function(){
        var self = this;
        self.$el.html(this.template());

        self.load();

        self.bind();

        return this;
      },
      destroy: function(){},
      launchLoader: function(){
        helpers.addClass(document.getElementById('loader'), 'hidden');
      },

      load: function(){
        var self = this,
            wrapper = document.getElementById('wrapper'),
            main = document.getElementById('main'),
            loader = document.getElementById('loader'),
            images = main.getElementsByTagName('img');

        helpers.removeClass(loader);

        helpers.addClass(loader, 'home'); 

        setTimeout(function(){ helpers.addClass(wrapper, 'hidden') }, 100);
        setTimeout(function(){ helpers.addClass(loader, 'visible') }, 200);
        setTimeout(function(){ 
          var loading = imagesLoaded(images),
              loaded = 0,
              progress = document.querySelectorAll('section#loader div.progress')[0];
          loading.on('always', function(){
            setTimeout("J.Views['home'].trigger('loaded')", 300);
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
      },

      bind: function(){}


    });

    return homeView;
});
