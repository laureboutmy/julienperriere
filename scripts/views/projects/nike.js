/*global define*/

define([
    'backbone', 
    'views/project',
    'text!templates/nike.html',
    'vendor/slider'
], function (Backbone, ProjectView, tplNike, slideIt) {
    // 'use strict';

    var NikeView = ProjectView.extend({
      template: _.template(tplNike),
      animations: [
        {
          selector: ".brief h2.default",
          position: 1200,
          animated: false,
          c: "animate"
        },
        {
          selector: ".iso",
          position: 1830,
          animated: false,
          c: "animate"
        },
        {
          selector: ".final-design h2.default",
          position: 2640,
          animated: false,
          c: "animate"
        },
        {
          selector: ".chapters",
          position: 3375,
          animated: false,
          c: "animate"
        },
        {
          selector: ".all-about-you",
          position: 3810,
          animated: false,
          c: "animate"
        },
        {
          selector: ".sports-data",
          position: 4240,
          animated: false,
          c: "animate"
        },
        {
          selector: ".best-shoes",
          position: 4691,
          animated: false,
          c: "animate"
        },
        {
          selector: ".your-diary",
          position: 5190,
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
       
    });
    return NikeView;
});

