/*global define*/

define([
    'backbone', 
    'imagesloaded',
    'views/project',
    'text!templates/game-of-thrones.html',
    'vendor/slider'
], function (Backbone, imagesLoaded, ProjectView, tplGameOfThrones, slideIt) {
    'use strict';
    var GameOfThronesView = ProjectView.extend({
      template: _.template(tplGameOfThrones),
      animations: [
        {
          selector: ".iso",
          position: 1570,
          animated: false,
          c: "animate"
        }
      ],

      render: function(){
        var self = this;
        self.$el.html(this.template());
        self.load();
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();

        return this;
      },

      bind: function(){
        var self = this,
            currentScroll = previousScroll = 0,
            delta;
        slideIt(document.querySelectorAll('.slider'));
        window.addEventListener('scroll', function(){
          previousScroll = currentScroll;
          currentScroll = window.pageYOffset;
          delta = previousScroll - currentScroll;
          self.renderAnimations(currentScroll, delta);
        })
    
      }
    })
    return GameOfThronesView;
});
