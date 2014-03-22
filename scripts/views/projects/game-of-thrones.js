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
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1820,
          animated: false,
          c: "animate"
        },
        {
          selector: ".countdown h2.default",
          position: 2740,
          animated: false,
          c: "animate"
        },
        {
          selector: ".hours",
          position: 3350,
          animated: false,
          c: "animate"
        },
        {
          selector: ".badges",
          position: 3820,
          animated: false,
          c: "animate"
        },
        {
          selector: ".player h2.default",
          position: 5240,
          animated: false,
          c: "animate"
        },
        {
          selector: ".content",
          position: 5925,
          animated: false,
          c: "animate"
        },
        {
          selector: ".cards",
          position: 6500,
          animated: false,
          c: "animate"
        },
        {
          selector: ".browser",
          position: 7040,
          animated: false,
          c: "animate"
        },
        {
          selector: ".mobile h2.default",
          position: 8390,
          animated: false,
          c: "animate"
        },
        {
          selector: ".remote",
          position: 9130,
          animated: false,
          c: "animate"
        },
        {
          selector: ".feed",
          position: 10650,
          animated: false,
          c: "animate"
        }
      ],

      render: function(){
        var self = this;
        this.el.innerHTML = this.template();
        self.load();
        J.Views['sidebar'].update(J.Status.currentView);
        self.bind();

        return this;
      },

      bind: function(){
        var self = this,
            previousScroll, 
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
