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
          setTimeout(function(){ self.initAnimations() }, 1000);
        });
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      },
      render: function(){
        var self = this;
        self.$el.html(this.template());

        self.load();

        self.bind();
        J.Views['sidebar'].update('');
        return this;
      },
      destroy: function(){},
      launchLoader: function(){
        helpers.addClass(document.getElementById('loader'), 'hidden');
      },
      initAnimations: function(){
        var main = document.getElementById('main');
        helpers.addClass(main.querySelector('article.home'), 'animate');
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
            setTimeout("J.Views['home'].trigger('loaded')", 400);
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
        setTimeout(function(){ helpers.removeClass(loader, 'visible') }, 300);
        setTimeout(function(){ helpers.addClass(loader, 'hidden') }, 800);
        setTimeout("loader.querySelectorAll('h1 div.progress')[0].style.height = 0;", 900);
      },

      bind: function(){
        Array.prototype.forEach.call(main.querySelectorAll('[data-home]'), function(el, i){
          el.addEventListener('click', function(e){
            e.preventDefault(); 
            if(helpers.hasClass(wrapper, 'open')){ helpers.removeClass(wrapper, 'open'); }
            helpers.removeClass(wrapper, 'unwound');
            var project = this.getAttribute('data-home');
            document.documentElement.pageYOffset = 0;
            helpers.addClass(loader, project);
            setTimeout(function(){ 
              helpers.removeClass(loader, 'hidden');
              J.Router.render(project, 'wait'); }, 300);
            
          })
        });
      }


    });

    return homeView;
});
